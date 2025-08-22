@echo off
echo Starting AuraMind EEG Analysis Dashboard...
echo.

echo Starting Python backend server...
start cmd /k "python sound_processor.py"

echo Starting frontend server...
start cmd /k "python -m http.server 8000"

echo.
echo Servers started successfully!
echo.
echo Frontend: http://localhost:8000/index%%20(1).html
echo Backend: http://localhost:5000
echo.
echo Press any key to open the dashboard in your default browser...
pause > nul

start http://localhost:8000/index%%20(1).html