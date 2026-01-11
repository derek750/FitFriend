# FitFriend

Allows users to have a fully functioning AI personal trainer. By speaking with this AI, it can recommend exercises, workout plans, and advice on anything gym related. Users can edit workouts suggested by the AI, and tailor it to their desired plan. Additionally, FitFriend tracks progress for users, allowing them to see how far they’ve come to reaching their goals. 

# How to Run

Backend
1. cd backend 
2. npm install
3. npm run dev

Frontend
1. cd frontend
2. npm install
3. npm run dev

# /backend/.env
PORT = 3000

GOOGLE_CLIENT_ID="Google Auth" (allow ips)

GOOGLE_CLIENT_SECRET="Client Secret"

MONGO_URI=mongodb api key must be accessible from ip

GEMINI_KEY=gemini key

ELEVENLABS_API_KEY=eleven labs key

