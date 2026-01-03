# Dayflow HR Suite - Backend Integration Setup Guide

## Overview

This project now has a complete backend API integrated with a PostgreSQL database. All data (users, employees, attendance, leave, payroll) is now fetched from the database instead of being stored locally.

## Project Structure

```
dayflow-hr-suite-main/
├── HRMS-Odoo/          # Frontend React application
│   ├── src/
│   │   ├── services/
│   │   │   └── api.ts   # API service layer
│   │   └── ...
└── backend/            # Backend Node.js/Express API
    ├── src/
    │   ├── routes/     # API route handlers
    │   ├── middleware/ # Auth middleware
    │   └── prisma/     # Database seed
    └── prisma/
        └── schema.prisma # Database schema
```

## Setup Instructions

### 1. Backend Setup

1. **Navigate to backend folder:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Copy `env.example.txt` to `.env`
   - Update the following:
     - `DATABASE_URL` - Your PostgreSQL connection string
     - `JWT_SECRET` - A secure random string
     - `PORT` - Backend server port (default: 5000)
     - `FRONTEND_URL` - Frontend URL for CORS

4. **Set up database:**
   ```bash
   # Generate Prisma Client
   npm run db:generate
   
   # Push schema to database
   npm run db:push
   
   # Seed database with initial data
   npm run db:seed
   ```

5. **Start backend server:**
   ```bash
   npm run dev
   ```

   Backend will run on `http://localhost:5000`

### 2. Frontend Setup

1. **Navigate to frontend folder:**
   ```bash
   cd HRMS-Odoo
   ```

2. **Set up environment variables:**
   - Create `.env` file in `HRMS-Odoo` folder
   - Add: `VITE_API_URL=http://localhost:5000/api`

3. **Install dependencies (if not already done):**
   ```bash
   npm install
   ```

4. **Start frontend:**
   ```bash
   npm run dev
   ```

   Frontend will run on `http://localhost:5173`

## Default Login Credentials

After seeding the database:

- **Admin:** admin@dayflow.com / admin123
- **HR:** hr@dayflow.com / hr123
- **Employee:** employee@dayflow.com / employee123

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login
- `POST /api/auth/signup` - Signup
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users` - Get all users (HR/Admin only)
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create user (HR/Admin only)
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (Admin only)

### Attendance
- `GET /api/attendance` - Get attendance records
- `GET /api/attendance/employee/:employeeId` - Get attendance by employee
- `POST /api/attendance` - Create attendance record
- `PUT /api/attendance/:id` - Update attendance (HR/Admin only)
- `DELETE /api/attendance/:id` - Delete attendance (HR/Admin only)

### Leave
- `GET /api/leave` - Get leave requests
- `GET /api/leave/:id` - Get leave request by ID
- `GET /api/leave/balance/:employeeId` - Get leave balance
- `POST /api/leave` - Create leave request
- `PUT /api/leave/:id` - Update leave request status (HR/Admin only)
- `DELETE /api/leave/:id` - Delete leave request

### Payroll
- `GET /api/payroll` - Get payroll records
- `GET /api/payroll/:id` - Get payroll record by ID
- `POST /api/payroll` - Create payroll record (HR/Admin only)
- `PUT /api/payroll/:id` - Update payroll record (HR/Admin only)
- `DELETE /api/payroll/:id` - Delete payroll record (Admin only)

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

## Database Schema

The database includes the following models:
- **User** - User accounts (admin, hr, employee)
- **AttendanceRecord** - Attendance tracking
- **LeaveRequest** - Leave applications
- **LeaveBalance** - Leave balance tracking
- **PayrollRecord** - Payroll information

## Features

✅ JWT-based authentication
✅ Role-based access control (Admin, HR, Employee)
✅ All data stored in PostgreSQL database
✅ RESTful API with proper error handling
✅ Frontend integrated with React Query for data fetching
✅ Type-safe API calls

## Notes

- All mock data has been replaced with API calls
- Authentication tokens are stored in localStorage
- The frontend automatically handles API errors and loading states
- Database migrations are handled by Prisma

## Troubleshooting

1. **Database connection issues:**
   - Ensure PostgreSQL is running
   - Check DATABASE_URL in `.env` file
   - Verify database exists

2. **CORS errors:**
   - Ensure FRONTEND_URL in backend `.env` matches your frontend URL
   - Check that backend server is running

3. **Authentication issues:**
   - Clear localStorage and try logging in again
   - Check JWT_SECRET is set in backend `.env`

