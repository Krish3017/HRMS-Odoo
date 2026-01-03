# Dayflow HR Backend API

Backend API server for Dayflow HR Suite built with Node.js, Express, TypeScript, and PostgreSQL.

## Features

- 🔐 JWT-based authentication
- 👥 User management (Admin, HR, Employee roles)
- 📅 Attendance tracking
- 🏖️ Leave management
- 💰 Payroll management
- 📊 Dashboard statistics
- 🗄️ PostgreSQL database with Prisma ORM

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and update:
   - `DATABASE_URL` - Your PostgreSQL connection string
   - `JWT_SECRET` - A secure random string for JWT tokens
   - `PORT` - Server port (default: 5000)
   - `FRONTEND_URL` - Frontend URL for CORS

3. **Set up the database:**
   ```bash
   # Generate Prisma Client
   npm run db:generate
   
   # Push schema to database
   npm run db:push
   
   # Seed database with initial data
   npm run db:seed
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:5000`

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

## Default Credentials

After seeding:
- **Admin:** admin@dayflow.com / admin123
- **HR:** hr@dayflow.com / hr123
- **Employee:** employee@dayflow.com / employee123

## Database Management

- `npm run db:generate` - Generate Prisma Client
- `npm run db:push` - Push schema changes to database
- `npm run db:migrate` - Create and run migrations
- `npm run db:studio` - Open Prisma Studio (database GUI)
- `npm run db:seed` - Seed database with initial data

## Production

1. Build the project:
   ```bash
   npm run build
   ```

2. Start the server:
   ```bash
   npm start
   ```

Make sure to set `NODE_ENV=production` in your production environment.

