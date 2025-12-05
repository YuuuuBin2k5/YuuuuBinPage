#!/bin/bash

echo "🚀 Starting Portfolio Spring Boot Backend..."
echo "=================================="

# Navigate to server directory
cd "$(dirname "$0")"

# Make mvnw executable
chmod +x mvnw

# Clean and compile
echo "📦 Cleaning and compiling..."
./mvnw clean compile

# Check if compilation was successful
if [ $? -eq 0 ]; then
    echo "✅ Compilation successful!"
    echo ""
    echo "🔥 Starting Spring Boot application..."
    echo "📡 API will be available at: http://localhost:8080/api"
    echo "📊 Health check: http://localhost:8080/actuator/health"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo "=================================="
    
    # Run Spring Boot
    ./mvnw spring-boot:run
else
    echo "❌ Compilation failed. Please check the errors above."
    exit 1
fi