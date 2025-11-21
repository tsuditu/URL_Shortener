
"""
This module defines the database models for the URL Shortener application.
It includes the URL model, which stores the original URL, its shortened code, and the creation timestamp.
"""
from django.db import models

class URL(models.Model):
    # Full original link submitted by the user
    original_url = models.URLField(unique=True)
    
    # Shortened code (hash-based or generated)
    short_code = models.CharField(max_length=10, unique=True)
    
    # Timestamp for when the record was created
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.short_code} → {self.original_url}"
