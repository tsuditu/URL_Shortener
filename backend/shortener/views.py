"""
This module contains the view functions for the URL Shortener application.
It defines API endpoints for shortening URLs and handling redirects from short codes to original URLs.
"""

from django.http import JsonResponse, HttpResponseRedirect
from django.views.decorators.csrf import csrf_exempt
from django.core.validators import URLValidator
from django.core.exceptions import ValidationError
from .models import URL
from urllib.parse import urlparse
import json
import hashlib


@csrf_exempt
def api_shorten(request):
    if request.method == "POST":
        data = json.loads(request.body)
        original_url = data.get("url", "").strip()
        # Extract origin (scheme + netloc) for constructing short URL
        parsed_url = urlparse(original_url)
        origin_url = f'{parsed_url.scheme}://{parsed_url.netloc}'

        if not original_url:
            return JsonResponse({"error": "No URL provided"}, status=400)

        # Validate proper URL format
        validator = URLValidator()
        try:
            validator(original_url)
        except ValidationError:
            return JsonResponse({"error": "Invalid URL format"}, status=400)

        # Check if the URL already exists in the DB
        existing = URL.objects.filter(original_url=original_url).first()
        if existing:
            short_url = f"{origin_url}/{existing.short_code}"
            return JsonResponse({
                'original_url': existing.original_url,
                'short_url': short_url
            })
        # Generate a short code from the original URL using MD5 hash (will be the same for the same URL)
        short_code = hashlib.md5(original_url.encode()).hexdigest()[:6]

        # Save the URL in the database
        new_url = URL.objects.create(original_url=original_url, short_code=short_code)
        short_url = f"{origin_url}/{new_url.short_code}"

        return JsonResponse({
            "original_url": original_url,
            "short_url": short_url
        })

    return JsonResponse({"error": "Invalid request method"}, status=405)


# New view: when visiting /<code>, redirect to original URL
def redirect_short_url(request, code):
    """
    Look up the original URL from the short code (short code is passed as 'code' parameter in urls.py)
    If found, redirect the user to the original URL.
    Otherwise, return a 404-style JSON error.
    """
    try:
        # Query the database for the given short_code
        url_obj = URL.objects.filter(short_code=code).first()

        # If the record exists, redirect to the original URL
        if url_obj:
            return HttpResponseRedirect(url_obj.original_url)

        # If no record found, return 404 JSON response
        return JsonResponse({"error": "Short URL not found"}, status=404)

    except Exception as e:
        # Handle unexpected server errors gracefully
        return JsonResponse({"error": str(e)}, status=500)