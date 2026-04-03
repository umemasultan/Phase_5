@echo off
echo 🚀 Starting Todo App in Standalone Mode (No Docker Required)...
echo.

REM Check Python
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is not installed or not in PATH
    pause
    exit /b 1
)

echo ✅ Python is available
echo.

REM Install backend dependencies
echo 📦 Installing backend dependencies...
cd backend
pip install fastapi uvicorn[standard] pydantic python-multipart >nul 2>&1
if errorlevel 1 (
    echo ⚠️  Some dependencies may have failed to install, but continuing...
)
cd ..

echo ✅ Dependencies installed
echo.

REM Start backend
echo 🔄 Starting backend service on port 8000...
start "Todo Backend" cmd /k "cd backend\src && python main_standalone.py"

timeout /t 3 /nobreak >nul

echo.
echo ✅ Backend service started!
echo.
echo 🌐 Services available:
echo    - Backend API: http://localhost:8000
echo    - API Docs: http://localhost:8000/docs
echo    - Health Check: http://localhost:8000/health
echo.
echo 💡 Test the API:
echo    curl http://localhost:8000/health
echo.
echo 📋 To stop: Close the backend window or press Ctrl+C
echo.

pause
