"""
This file defines the URL routes for the shortener app.
Each path maps a specific endpoint (like /api/shorten/ or /<code>/) to its corresponding view function.
Routes are checked in order until a match is found.
"""
from django.urls import path
from . import views

urlpatterns = [
    path('api/shorten/', views.api_shorten, name='api_shorten_endpoint'),
    path('api/history/', views.api_history, name='api_history_endpoint'),
    path('<str:code>/', views.redirect_short_url, name='redirect_short_url_endpoint'),
]
