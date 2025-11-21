import pytest
from shortener.models import URL

# @pytest.mark.django_db
# Marks the test as requiring database access.
# pytest-django creates a temporary test database before the test runs
# and destroys it afterward, ensuring isolation and no side effects
# on the real project database.

@pytest.mark.django_db
def test_redirect_valid_short_code(client):
    """
    Test that a valid short_code redirects to the correct original_url.
    """
    # Arrange: create an object manually in DB
    url_obj = URL.objects.create(
        original_url="https://www.google.com",
        short_code="abc123"
    )

    # Act: simulate visiting the short URL
    response = client.get(f"/{url_obj.short_code}/")

    # Assert: should redirect (HTTP 302) to the original URL
    assert response.status_code == 302
    assert response["Location"] == url_obj.original_url


@pytest.mark.django_db
def test_redirect_invalid_short_code(client):
    """
    Test that an invalid short_code returns 404 JSON response.
    """
    # Act: simulate visiting a non-existing short_code
    response = client.get("/invalid123/")

    # Assert: should return 404
    assert response.status_code == 404
    assert response.json()["error"] == "Short URL not found"
