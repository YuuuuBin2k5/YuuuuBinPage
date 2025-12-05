@echo off
echo 🚀 Starting Portfolio Spring Boot Backend...
echo ==================================

REM Navigate to server directory
cd /d "%~dp0"

REM Clean and compile
echo 📦 Cleaning and compiling...
mvnw.cmd clean compile

REM Check if compilation was successful
if %ERRORLEVEL% EQU 0 (
    echo ✅ Compilation successful!
    echo.
    echo 🔥 Starting Spring Boot application...
    echo 📡 API will be available at: http://localhost:8080/api
    echo 📊 Health check: http://localhost:8080/actuator/health
    echo.
    echo Press Ctrl+C to stop the server
    echo ==================================
    
    REM Run Spring Boot
    mvnw.cmd spring-boot:run
) else (
    echo ❌ Compilation failed. Please check the errors above.
    pause
    exit /b 1
)