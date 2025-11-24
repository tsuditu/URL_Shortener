import pytest
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
