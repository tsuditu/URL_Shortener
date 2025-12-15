@echo off
setlocal enabledelayedexpansion

echo ==========================================
echo   Starting URL Shortener Application
echo ==========================================

REM -------------------------------------------------------
REM Check Python
REM -------------------------------------------------------
call python --version >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo ERROR: Python is not installed!
    pause
    exit /b
)

REM -------------------------------------------------------
REM Check Node.js
REM -------------------------------------------------------
call node --version >nul 2>&1
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
    call python -m venv .venv
)

echo Activating virtual environment...
call .venv\Scripts\activate

REM -------------------------------------------------------
REM Ensure backend .env exists (copy from .env.example if missing)
REM -------------------------------------------------------
cd backend
if not exist ".env" (
    echo .env not found in backend. Copying from .env.example...
    if exist ".env.example" (
        copy .env.example .env >nul
        echo Please edit backend/.env and set your SECRET_KEY!
    ) else (
        echo ERROR: backend/.env.example not found!
        pause
        exit /b
    )
)
cd ..

REM -------------------------------------------------------
REM Ensure frontend .env exists (copy from .env.example if missing)
REM -------------------------------------------------------
cd frontend
if not exist ".env" (
    echo .env not found in frontend. Copying from .env.example...
    if exist ".env.example" (
        copy .env.example .env >nul
        echo Please edit frontend/.env if you need to change VITE_BACKEND_URL!
    ) else (
        echo ERROR: frontend/.env.example not found!
        pause
        exit /b
    )
)
cd ..

REM -------------------------------------------------------
REM Install backend dependencies
REM -------------------------------------------------------
echo Installing backend dependencies...
call pip install -r requirements.txt

REM -------------------------------------------------------
REM Install frontend dependencies if not already installed
REM -------------------------------------------------------
IF NOT EXIST "frontend\node_modules" (
    echo Installing frontend dependencies...
    pushd frontend
    call npm install
    IF !ERRORLEVEL! NEQ 0 (
        echo ERROR: npm install failed!
        pause
        exit /b
    )
    popd
) ELSE (
    echo Frontend dependencies already installed.
)

REM -------------------------------------------------------
REM Apply migrations ONLY if database does not exist
REM -------------------------------------------------------
if not exist "backend\db.sqlite3" (
    echo No database found. Running initial migrations...
    cd backend
    call python manage.py migrate --noinput
    cd ..
) else (
    echo Database found. Skipping migrations.
)

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
    call flake8 . --ignore=E131,E501,W292,W503
    cd ..

    REM -------------------------------------------------------
    REM Run Pytest (Backend tests)
    REM -------------------------------------------------------
    echo.
    echo -------------------------------------------------------
    cd backend
    echo Running pytest on backend...
    echo -------------------------------------------------------
    call pytest
    cd ..

    REM -------------------------------------------------------
    REM Run Vitest (Frontend tests)
    echo.
    echo -------------------------------------------------------
    cd frontend
    echo Running Vitest tests on frontend...
    echo -------------------------------------------------------
    call npm test -- --run
    REM -------------------------------------------------------
) else (
    REM -------------------------------------------------------
    REM Start backend (new window)
    REM -------------------------------------------------------
    echo Starting Django backend...
    start "" cmd /k "cd backend && python manage.py runserver"

    REM -------------------------------------------------------
    REM Read VITE_FRONTEND_URL from frontend/.env and open in browser
    REM -------------------------------------------------------
    set "VITE_FRONTEND_URL="
    for /f "usebackq tokens=1,* delims==" %%A in ("frontend\.env") do (
        if /i "%%A"=="VITE_FRONTEND_URL" set "VITE_FRONTEND_URL=%%B"
    )
    if defined VITE_FRONTEND_URL (
        echo Opening frontend web page: !VITE_FRONTEND_URL!
        start "" "!VITE_FRONTEND_URL!"
    ) else (
        echo ERROR: VITE_FRONTEND_URL not found in frontend/.env. Skipping browser launch.
        exit /b
    )

    REM -------------------------------------------------------
    REM Start frontend (new window)
    REM -------------------------------------------------------
    echo Starting Vite frontend...
    start "" cmd /k "cd frontend && npm run dev"
)

echo Application started successfully!
echo PS: If you want to run linting and tests, please run 'start_url_shortener.bat test'.
pause
