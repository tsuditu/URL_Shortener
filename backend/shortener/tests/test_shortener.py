import pytest
import time
from django.urls import reverse
from shortener.models import URL

# @pytest.mark.django_db
# Marks the test as requiring database access.
# pytest-django creates a temporary test database before the test runs
# and destroys it afterward, ensuring isolation and no side effects
# on the real project database.


@pytest.mark.django_db
def test_shorten_url_creation(client):
    """
    Test that a valid URL can be shortened and saved in the database.
    """
    data = {"url": "https://www.google.com"}
    # reverse helps to get URL from the 'name' defined in urls.py
    response = client.post(reverse("api_shorten_endpoint"), data, content_type="application/json")

    assert response.status_code == 200
    json_data = response.json()

    # Verify JSON keys exist
    assert "original_url" in json_data
    assert "short_url" in json_data

    # Verify that the record was saved in DB
    obj = URL.objects.filter(original_url="https://www.google.com").first()
    assert obj is not None
    assert len(obj.short_code) == 6


@pytest.mark.django_db
def test_duplicate_url_returns_same_code(client):
    """
    Test that the same URL always returns the same short code (deterministic hash).
    """
    data = {"url": "https://www.djangoproject.com"}
    client.post(reverse("api_shorten_endpoint"), data, content_type="application/json")
    client.post(reverse("api_shorten_endpoint"), data, content_type="application/json")

    first_code = URL.objects.first().short_code
    second_code = URL.objects.last().short_code
    assert first_code == second_code


@pytest.mark.django_db
def test_invalid_url_returns_error(client):
    """
    Test that invalid URLs are rejected by the API.
    """
    data = {"url": "invalid-url"}
    response = client.post(reverse("api_shorten_endpoint"), data, content_type="application/json")

    assert response.status_code == 400
    assert response.json()["error"] == "Invalid URL format"


@pytest.mark.django_db
def test_api_history_returns_recent_links(client):
    """
    Test GET /api/history/ returns recent shortened links, paginated and ordered.
    """
    # Create 3 links
    urls = [
        "https://site1.com",
        "https://site2.com",
        "https://site3.com"
    ]
    for url in urls:
        client.post(reverse("api_shorten_endpoint"), {"url": url}, content_type="application/json")
        time.sleep(0.01)  # Ensure different timestamps

    # No params (default page=1, page_size=10)
    response = client.get(reverse("api_history_endpoint"))
    assert response.status_code == 200
    data = response.json()
    assert "history" in data
    assert len(data["history"]) == 3

    # Verify strict ordering: most recent links appear first
    returned_urls = [item["original_url"] for item in data["history"]]
    assert returned_urls == urls[::-1]

    # Test pagination: page_size=2
    response = client.get(reverse("api_history_endpoint") + "?page=1&page_size=2")
    data = response.json()
    assert len(data["history"]) == 2
    assert data["page"] == 1
    assert data["num_pages"] == 2
    assert data["total"] == 3