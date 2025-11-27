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
REM Open browser
REM -------------------------------------------------------
echo Opening browser...
timeout /t 4 >nul
start http://localhost:3000

echo Application started successfully!
pause
