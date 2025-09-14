#!/bin/bash

# Start backend
cd backend
npm install
npm run dev &
BACKEND_PID=$!

# Start frontend
cd ../frontend
npm install
npm run dev &
FRONTEND_PID=$!

# Cleanup function
cleanup() {
  echo "Stopping backend and frontend..."
  kill $BACKEND_PID $FRONTEND_PID
  wait $BACKEND_PID $FRONTEND_PID 2>/dev/null
  echo "Stopped."
}

# Trap Ctrl+C (SIGINT) and script exit to stop both
trap cleanup SIGINT EXIT

# Wait for both to finish
wait
