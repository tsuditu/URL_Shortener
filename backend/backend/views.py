"""
Views module for URL Shortener MVP.
Defines the API endpoint for shortening URLs.
"""

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponseRedirect
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
    original_url = short_urls.get(code)
    if original_url:
        return HttpResponseRedirect(original_url)
    return JsonResponse({"error": "Short URL not found"}, status=404)