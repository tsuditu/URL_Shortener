# URL Shortener

A full-stack URL shortener application with a Django backend and a React frontend.

## Project Structure

- `.github\workflows` - CI/CD file
- `backend/` - Django backend for URL shortening and redirection
- `frontend/` - React frontend for user interaction
- `docs/` - Documentation and refinement notes

## Quick Start

To quickly launch the application, open a Command Prompt window, navigate to the project root directory, and run:

```sh
start_url_shortener.bat
```

This script will start both the backend and frontend servers for you.

## Getting Started

### Backend (Django)

1. **Check Python installation and version:**
    ```sh
    python --version
    ```
2. **Check `.env` file and secret key:**
    Ensure you have a `.env` file with the required environment variables (e.g., `SECRET_KEY`).
3. **Navigate to the backend directory:**
    ```sh
    cd backend
    ```
4. **(Optional) Create and activate a virtual environment:**
    ```sh
    python -m venv venv
    .\venv\Scripts\activate
    ```
5. **Install dependencies:**
    ```sh
    go to root project:
    pip install -r requirements.txt
    ```
6. **Run migrations:**
    ```sh
    python manage.py migrate
    ```
7. **Start the backend server:**
    ```sh
    python manage.py runserver
    ```

### Frontend (React)

1. **Check Node.js installation and version:**
    ```sh
    node --version
    npm --version
    ```
2. **Navigate to the frontend directory:**
    ```sh
    cd frontend
    ```
3. **Install dependencies:**
    ```sh
    npm install
    ```
4. **Start the frontend development server:**
    ```sh
    npm start
    ```

## Running Tests & Linting

### Backend
- **Run tests:**
    ```sh
    cd backend
    pytest
    ```
- **Run linter:**
    ```sh
    flake8 .
    ```

### Frontend
- **Run tests:**
    ```sh
    cd frontend
    npm test
    ```

## Pipeline Runs

This project uses a CI pipeline defined in the `fullstack_ci.yml` file, located in the `.github/workflows/` directory. The pipeline automates testing and linting for both the backend and frontend whenever changes are pushed or pull requests are opened. It ensures code quality and helps catch issues early in the development process.

Typical steps in the pipeline include:
- Installing dependencies for both backend and frontend
- Running backend tests with `pytest`
- Running backend linting with `flake8`
- Running frontend tests with `npm test`
- Reporting results directly in the pull request or commit status

You can review or modify the pipeline by editing the `fullstack_ci.yml` file.

## Documentation

See the `docs/` folder for detailed requirements and refinement notes.

## Author

Tiberiu Gabriel Suditu
