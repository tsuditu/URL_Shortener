@echo off
setlocal enabledelayedexpansion

echo ==========================================
echo   Starting URL Shortener Application
echo ==========================================

REM -------------------------------------------------------
REM Check Python
REM -------------------------------------------------------
python --version >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo ERROR: Python is not installed!
    pause
    exit /b
)

REM -------------------------------------------------------
REM Check Node.js
REM -------------------------------------------------------
node --version >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed!
    pause
    exit /b
)

REM -------------------------------------------------------
REM Check or create virtual environment
REM -------------------------------------------------------
if not exist ".venv" (
    echo Creating virtual environment...
    python -m venv .venv
)

echo Activating virtual environment...
call .venv\Scripts\activate

REM -------------------------------------------------------
REM Check for .env file and SECRET_KEY
REM -------------------------------------------------------
cd backend
if not exist ".env" (
    echo ERROR: .env file not found! Also, make sure to set SECRET_KEY in .env file.
    pause
    exit /b
)
cd ..

REM -------------------------------------------------------
REM Apply migrations ONLY if database does not exist
REM -------------------------------------------------------
if not exist "backend\db.sqlite3" (
    echo No database found. Running initial migrations...
    cd backend
    python manage.py migrate --noinput
    cd ..
) else (
    echo Database found. Skipping migrations.
)

REM -------------------------------------------------------
REM Install backend dependencies
REM -------------------------------------------------------
echo Installing backend dependencies...
pip install -r requirements.txt

REM -------------------------------------------------------
REM Install frontend dependencies
REM -------------------------------------------------------
IF NOT EXIST "frontend\node_modules" (
    echo Installing frontend dependencies...
    pushd frontend
    npm install
    popd
) ELSE (
    echo Frontend dependencies already installed.
)

REM -------------------------------------------------------
REM Start backend (new window)
REM -------------------------------------------------------
echo Starting Django backend...
start "" cmd /k "cd backend && python manage.py runserver"

REM -------------------------------------------------------
REM Start frontend (new window)
REM -------------------------------------------------------
echo Starting React frontend...
start "" cmd /k "cd frontend && npm start"

REM -------------------------------------------------------
REM If argument is "test", run linting and tests
REM -------------------------------------------------------
IF "%1"=="test" (
    echo Running linting and tests...
    
    REM -------------------------------------------------------
    REM Lint with flake8
    REM -------------------------------------------------------
    echo.
    echo -------------------------------------------------------
    echo Running flake8 linting on backend...
    echo -------------------------------------------------------
    cd backend
    flake8 . --ignore=E501,W292,W503
    cd ..

    REM -------------------------------------------------------
    REM Run Pytest (Backend tests)
    REM -------------------------------------------------------
    echo.
    echo -------------------------------------------------------
    cd backend
    echo Running pytest on backend...
    echo -------------------------------------------------------
    pytest
    cd ..

    REM -------------------------------------------------------
    REM Run Jest (Frontend tests)
    echo.
    echo -------------------------------------------------------
    cd frontend
    echo Running Jest tests on frontend...
    echo -------------------------------------------------------
    npm test -- --watchAll=false
    cd ..
    REM -------------------------------------------------------
)

echo Application started successfully!
echo PS: If you want to run linting and tests, please run 'run_tests_and_lint.bat'.
pause
