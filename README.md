# HRMS Lite

A lightweight, full-stack Human Resource Management System built for employee management and daily attendance tracking.

---

## Features

- Add, view, and delete employee records
- Mark daily attendance (Present / Absent) per employee
- View and filter attendance records by date
- Real-time dashboard — Total Employees, Present Today, Attendance Rate, Absent Today
- Backend validations — duplicate ID, duplicate email, duplicate attendance
- Toast notifications for all actions
- Responsive dark theme UI with loading and empty states
  
---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, Tailwind CSS, Axios |
| Backend | Python, FastAPI |
| Database | MongoDB Atlas |
| Frontend Deployment | Vercel |
| Backend Deployment | Render |

---

## Live Demo

| Service | URL |
|---|---|
| Frontend | https://hrms-lite-etharaai.vercel.app/ |
| Backend API Docs | https://hrms-lite-backend-zxl8.onrender.com/docs |
| GitHub Repository | https://github.com/akdaftuar09/hrms-lite-fullstack |

---

## API Endpoints

### Employees
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/employees/` | Get all employees |
| POST | `/api/employees/` | Add new employee |
| DELETE | `/api/employees/{employee_id}` | Delete employee |

### Attendance
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/attendance/` | Mark attendance |
| GET | `/api/attendance/{employee_id}` | Get attendance by employee |

---

## Assumptions & Limitations

- Single admin user — no authentication required
- Attendance can be marked once per employee per date
- Leave management and payroll are out of scope
- Backend may take 30–50 seconds to wake up on first request (Render free tier)

---

## Author

**Akash Sinha**
