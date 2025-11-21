# Why pytest instead of unittest:
# - Simpler and cleaner syntax (no need for classes or setUp/tearDown).
# - Built-in fixture system (e.g., `client`, `db`, `settings`) injected automatically.
# - More readable and detailed error output on test failure.
# - Perfectly compatible with Django through pytest-django plugin.

# Why install pytest-django (check requirements.txt):
# pytest-django integrates pytest with Django’s environment.
# It automatically sets up DJANGO_SETTINGS_MODULE, loads Django apps,
# and manages a temporary database for testing.
# Without pytest-django:
# - Django settings are not configured (ImproperlyConfigured errors).
# - INSTALLED_APPS and ORM are not initialized.
# - You must manually call django.setup() and configure the environment.

