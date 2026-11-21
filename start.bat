@echo off
cd /d "%~dp0"
start "Pololingo-Server" /min node server.js
timeout /t 1 /nobreak >nul
start "" msedge "http://localhost:5180"
