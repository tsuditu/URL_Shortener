"""
Main URL configuration for the Django project.
Includes URL patterns for the admin site and the 'shortener' feature app.
Including 'shortener.urls' allows the project to route requests to URL shortening functionality.

This file defines the main URL routes for your Django project.
Each "path" maps a URL (like /admin/ or /home/) to a specific view (a Python function or class).
When someone visits a URL, Django checks this list from top to bottom until it finds a match.
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('shortener.urls')),
]
