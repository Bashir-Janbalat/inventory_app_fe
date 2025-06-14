@echo off
setlocal

echo 🔄 Entferne alte Container falls vorhanden...
docker-compose -f docker-compose.inventory_frontend.yml down

echo 🚮 Entferne altes Image falls vorhanden...
docker image inspect inventory_frontend:latest >nul 2>&1
IF %ERRORLEVEL% EQU 0 (
    docker rm -f inventory_frontend >nul 2>&1
)

echo 🛠️  Baue und starte React Frontend mit Docker Compose...
docker-compose -f docker-compose.inventory_frontend.yml up --build -d
IF %ERRORLEVEL% NEQ 0 (
    echo ❌ FEHLER: docker-compose konnte nicht gestartet werden.
    exit /b %ERRORLEVEL%
)

timeout /t 3 > nul

start http://localhost:3000
echo ✅ Frontend laeuft auf http://localhost:3000

endlocal
pause
