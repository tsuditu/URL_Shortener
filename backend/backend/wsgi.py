"""
WSGI config for backend project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/wsgi/
"""


# WSGI (Web Server Gateway Interface) is the standard way
# for Python web servers (like Gunicorn, uWSGI, Apache mod_wsgi)
# to communicate with your Django application.
# In production, your server will use this file to load and run Django.

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

application = get_wsgi_application()
