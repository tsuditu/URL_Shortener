# Backend - URL Shortener

This folder contains the Django backend for the URL Shortener application.

## Setup Instructions

1. Ensure Python 3.8+ is installed:
   ```sh
   python --version
   ```
2. (Optional) Create and activate a virtual environment:
   ```sh
   python -m venv venv
   .\venv\Scripts\activate
   ```
3. Install dependencies from the root project:
   ```sh
   go to root project:
   pip install -r requirements.txt
   ```
4. Set up your `.env` file with required environment variables (e.g., `SECRET_KEY`).
5. Run migrations:
   ```sh
   python manage.py migrate
   ```
6. Run linter:
   ```sh
   flake8 .
   ```
7. Start the development server:
   ```sh
   python manage.py runserver
   ```

## Running Tests

```sh
pytest
```

## Project Structure

- `backend/` - Django project settings and configuration
- `shortener/` - App for URL shortening logic
- `tests/` - Backend unit tests

## Notes
- See the root `README.md` for full-stack setup and project overview.
- See `docs/` for additional documentation.
