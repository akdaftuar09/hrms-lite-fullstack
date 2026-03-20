# HRMS Lite

A lightweight full-stack Human Resource Management System built for employee management and attendance tracking.

## Features
- Add employee
- Delete employee
- View employee list
- Mark attendance
- View attendance records
- Responsive UI

## Tech Stack
Frontend: React + Tailwind CSS  
Backend: FastAPI  
Database: MongoDB Atlas  

## Deployment
Frontend: https://hrms-lite-fullstack-nine.vercel.app  
Backend: https://hrms-lite-backend-zxl8.onrender.com  

## Run Locally

### Backend
cd server
pip install -r requirements.txt
uvicorn app.main:app --reload

### Frontend
cd client
npm install
npm run dev