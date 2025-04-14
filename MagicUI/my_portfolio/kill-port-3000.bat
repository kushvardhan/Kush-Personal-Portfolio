@echo off
echo Checking for processes using port 3000...

for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000 ^| findstr LISTENING') do (
    echo Found process with PID: %%a
    echo Attempting to kill process...
    taskkill /F /PID %%a
    if %ERRORLEVEL% EQU 0 (
        echo Successfully killed process with PID: %%a
    ) else (
        echo Failed to kill process with PID: %%a
    )
)

echo Done. You can now start your application on port 3000.
pause
