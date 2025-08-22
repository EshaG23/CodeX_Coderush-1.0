#!/bin/bash

echo "Starting AuraMind EEG Analysis Dashboard..."
echo ""

echo "Starting Python backend server..."
python sound_processor.py &
BACKEND_PID=$!

echo "Starting frontend server..."
python -m http.server 8000 &
FRONTEND_PID=$!

echo ""
echo "Servers started successfully!"
echo ""
echo "Frontend: http://localhost:8000/index%20(1).html"
echo "Backend: http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop the servers"

# Wait for user to press Ctrl+C
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait