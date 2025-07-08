@echo off
echo Starting ScholarBEE Development Servers...
echo.

echo Starting Backend Server...
start "Backend Server" cmd /k "cd backend && npm start"

echo Starting Frontend Server...
start "Frontend Server" cmd /k "cd frontend && npm run dev"

echo.
echo Both servers are starting...
echo Backend will be available at: http://localhost:3000
echo Frontend will be available at: http://localhost:5173
echo.
echo Press any key to close this window...
pause >nul 