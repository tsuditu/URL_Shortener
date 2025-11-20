"""
This module contains the view functions for the URL Shortener application.
It defines API endpoints for shortening URLs and handling redirects from short codes to original URLs.
"""

from django.http import JsonResponse, HttpResponseRedirect
from django.views.decorators.csrf import csrf_exempt
from django.core.validators import URLValidator
from django.core.exceptions import ValidationError
import json
import hashlib


# Dictionary to temporarily store URLs (for MVP demo)
short_urls = {}

@csrf_exempt
def api_shorten(request):
    if request.method == "POST":
        data = json.loads(request.body)
        original_url = data.get("url", "").strip()

        if not original_url:
            return JsonResponse({"error": "No URL provided"}, status=400)

        # Validate proper URL format
        validator = URLValidator()
        try:
            validator(original_url)
        except ValidationError:
            return JsonResponse({"error": "Invalid URL format"}, status=400)

        # Generate a short code from the original URL using MD5 hash (will be the same for the same URL)
        short_code = hashlib.md5(original_url.encode()).hexdigest()[:6]
        short_urls[short_code] = original_url  # store mapping temporarily
        short_url = f"http://127.0.0.1:8000/{short_code}"

        return JsonResponse({
            "original_url": original_url,
            "short_url": short_url
        })

    return JsonResponse({"error": "Invalid request method"}, status=405)


# New view: when visiting /<code>, redirect to original URL
def redirect_short_url(request, code):
    # Look up the original URL from the short code (short code is passed as 'code' parameter in urls.py)
    original_url = short_urls.get(code)
    if original_url:
        return HttpResponseRedirect(original_url)
    return JsonResponse({"error": "Short URL not found"}, status=404)