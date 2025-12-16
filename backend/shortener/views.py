"""
This module contains the view functions for the URL Shortener application.
It defines API endpoints for shortening URLs and handling redirects from short codes to original URLs.
"""

from django.http import JsonResponse, HttpResponseRedirect
from django.views.decorators.csrf import csrf_exempt
from django.core.validators import URLValidator
from django.core.exceptions import ValidationError
from django.core.paginator import Paginator
from .models import URL
import json
import hashlib


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

        # Check if the URL already exists in the DB
        existing = URL.objects.filter(original_url=original_url).first()
        if existing:
            short_url = f"/{existing.short_code}"
            return JsonResponse({
                'original_url': existing.original_url,
                'short_url': short_url
            })
        # Generate a short code from the original URL using MD5 hash (will be the same for the same URL)
        short_code = hashlib.md5(original_url.encode()).hexdigest()[:6]

        # Save the URL in the database
        new_url = URL.objects.create(original_url=original_url, short_code=short_code)
        short_url = f"/{new_url.short_code}"

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


def api_history(request):
    """
    API endpoint to retrieve paginated history of shortened URLs.
    Accepts 'page' and 'page_size' as GET parameters for pagination.
    """
    if request.method == "GET":
        page = int(request.GET.get("page", 1))
        page_size = int(request.GET.get("page_size", 10))
        urls = URL.objects.order_by("-created_at")
        paginator = Paginator(urls, page_size)
        page_obj = paginator.get_page(page)
        history = [
            {
                "original_url": url.original_url,
                "short_code": url.short_code,
                "short_url": f"/{url.short_code}",
                "created_at": url.created_at.isoformat()
            }
            for url in page_obj
        ]
        return JsonResponse({
            "history": history,
            "page": page_obj.number,
            "num_pages": paginator.num_pages,
            "total": paginator.count
        })
    return JsonResponse({"error": "Invalid request method"}, status=405)