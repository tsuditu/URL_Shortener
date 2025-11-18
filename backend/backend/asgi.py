"""
ASGI config for backend project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/asgi/
"""

# ASGI (Asynchronous Server Gateway Interface) is the modern version of WSGI.
# It allows Django to handle both traditional HTTP requests and asynchronous features like WebSockets or real-time updates.
# This file acts as the entry point for ASGI-compatible web servers (like Uvicorn or Daphne).

import os

from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

application = get_asgi_application()
