@echo off
title Vich Shop Local Server
echo ==============================================
echo        Vich Shop Web Server Launcher
echo ==============================================
echo.
echo Local Website Link: http://localhost:8080
echo Network (Phone/Wi-Fi): http://192.168.18.97:8080
echo.
echo Opening browser...
start http://localhost:8080
echo.
echo Serving files... (Press Ctrl+C to stop)
python -m http.server 8080
pause
