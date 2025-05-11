@echo off
setlocal

echo Building and starting React frontend with Docker Compose...

REM docker-compose starten und auf Fehler prüfen
docker-compose -f docker-compose.inventory_app_fe.yml up --build -d
IF %ERRORLEVEL% NEQ 0 (
    echo [FEHLER] docker-compose konnte nicht gestartet werden.
    exit /b %ERRORLEVEL%
)

echo Docker Compose erfolgreich gestartet.

REM Warten kurz, damit der Server Zeit zum Hochfahren hat
timeout /t 3 > nul

REM Browser öffnen
start http://localhost:3000

echo Frontend lueuft auf http://localhost:3000
endlocal
pause
