"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

# This file defines the main URL routes for your Django project.
# Each "path" maps a URL (like /admin/ or /home/) to a specific view (a Python function or class).
# When someone visits a URL, Django checks this list from top to bottom until it finds a match.

from django.contrib import admin
from django.urls import path
from backend import views  # import function from views.py

urlpatterns = [
    path('admin/', admin.site.urls),                # Django admin interface (optional)
    path('api/shorten/', views.api_shorten),        # URL for shortening API
    path('<str:code>/', views.redirect_short_url),  # Redirect short URL to original URL
]
