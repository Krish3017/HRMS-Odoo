# Dayflow HR Suite

A comprehensive Human Resource Management System with React frontend and Node.js/Express backend.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

### Installation

1. **Install all dependencies:**
   ```bash
   npm run install:all
   ```

2. **Set up backend environment:**
   ```bash
   cd backend
   cp env.example.txt .env
   # Edit .env with your database credentials
   ```

3. **Set up frontend environment:**
   ```bash
   cd HRMS-Odoo
   # Create .env file with: VITE_API_URL=http://localhost:5000/api
   ```

4. **Set up database:**
   ```bash
   npm run db:generate
   npm run db:push
   npm run db:seed
   ```

5. **Start both servers:**
   ```bash
   npm run dev
   ```

   This will start:
   - Backend API on `http://localhost:5000`
   - Frontend on `http://localhost:5173` (or `http://localhost:8080`)

## 📁 Project Structure

```
dayflow-hr-suite-main/
├── backend/          # Node.js/Express API
├── HRMS-Odoo/        # React Frontend
└── package.json      # Root package.json for running both
```

## 🔑 Default Login Credentials

After seeding the database:
- **Admin:** admin@dayflow.com / admin123
- **HR:** hr@dayflow.com / hr123
- **Employee:** employee@dayflow.com / employee123

## 📝 Available Scripts

### Root Level
- `npm run dev` - Start both frontend and backend
- `npm run install:all` - Install dependencies for all projects
- `npm run build` - Build both frontend and backend
- `npm run db:generate` - Generate Prisma Client
- `npm run db:push` - Push schema to database
- `npm run db:seed` - Seed database with initial data
- `npm run db:studio` - Open Prisma Studio

### Individual Projects
- `cd backend && npm run dev` - Start backend only
- `cd HRMS-Odoo && npm run dev` - Start frontend only

## 📚 Documentation

- [Setup Guide](./SETUP.md) - Detailed setup instructions
- [Project Summary](./PROJECT_SUMMARY.md) - Complete project overview
- [Backend README](./backend/README.md) - Backend API documentation

## 🛠️ Technology Stack

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Query
- React Router

### Backend
- Node.js
- Express
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT Authentication

## 📄 License

ISC

