# HRMS-Odoo

A modern Human Resource Management System (HRMS) built with React, TypeScript, and Tailwind CSS. This application provides comprehensive HR management features including employee management, attendance tracking, leave management, payroll, and reporting.

## ✨ Features

### Core Modules

- **Dashboard** - Personalized dashboards for HR/Admin and Employees with key metrics and quick actions
- **Employee Management** - Complete employee profiles, directory, and management tools
- **Attendance Tracking** - Check-in/check-out system with attendance records and status tracking
- **Leave Management** - Leave request submission, approval workflow, and balance tracking
- **Payroll** - Salary management, payslip generation, and payroll records
- **Reports** - Comprehensive reporting and analytics
- **Settings** - System configuration and user preferences
- **Profile Management** - User profile management and personal settings

### Key Capabilities

- 🔐 **Authentication & Authorization** - Secure login/signup with role-based access control (Employee, HR, Admin)
- 🎨 **Modern UI** - Built with shadcn/ui components and Tailwind CSS
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- 🌓 **Theme Support** - Light and dark mode support
- ⚡ **Fast Performance** - Built with Vite for lightning-fast development and optimized builds
- 🔒 **Protected Routes** - Secure route protection based on authentication status
- 📊 **Data Visualization** - Charts and graphs for better insights

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** or **yarn** or **bun** (package manager)

### Installation

1. **Clone the repository**

```bash
git clone <YOUR_GIT_URL>
cd HRMS-Odoo
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
bun install
```

3. **Start the development server**

```bash
npm run dev
# or
yarn dev
# or
bun dev
```

4. **Open your browser**

Navigate to `http://localhost:5173` (or the port shown in your terminal)

## 📦 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run build:dev` - Build for development environment
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

## 🏗️ Project Structure

```
HRMS-Odoo/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable React components
│   │   ├── common/         # Common components (PageHeader, StatCard, etc.)
│   │   ├── layout/         # Layout components (Sidebar, Topbar, ERPLayout)
│   │   └── ui/             # shadcn/ui components
│   ├── contexts/           # React context providers (Auth, Theme)
│   ├── data/               # Mock data and fixtures
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── pages/              # Page components/routes
│   │   ├── auth/           # Authentication pages (Login, Signup)
│   │   ├── Dashboard.tsx
│   │   ├── Employees.tsx
│   │   ├── Attendance.tsx
│   │   ├── Leave.tsx
│   │   ├── Payroll.tsx
│   │   ├── Reports.tsx
│   │   └── ...
│   ├── types/              # TypeScript type definitions
│   ├── App.tsx             # Main App component with routing
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles
├── package.json
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.ts      # Tailwind CSS configuration
└── vite.config.ts          # Vite configuration
```

## 🛠️ Technology Stack

### Core Framework
- **[Vite](https://vitejs.dev/)** - Next-generation frontend build tool
- **[React](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript

### UI & Styling
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Re-usable components built with Radix UI and Tailwind CSS
- **[Lucide React](https://lucide.dev/)** - Icon library

### Routing & State Management
- **[React Router](https://reactrouter.com/)** - Declarative routing
- **[TanStack Query](https://tanstack.com/query)** - Data fetching and caching
- **[React Context API](https://react.dev/reference/react/useContext)** - Global state management

### Forms & Validation
- **[React Hook Form](https://react-hook-form.com/)** - Performant forms
- **[Zod](https://zod.dev/)** - Schema validation

### Data Visualization
- **[Recharts](https://recharts.org/)** - Charting library

### Development Tools
- **[ESLint](https://eslint.org/)** - Code linting
- **[TypeScript ESLint](https://typescript-eslint.io/)** - TypeScript-specific linting rules

## 🔑 User Roles

The system supports three user roles:

1. **Employee** - View personal dashboard, attendance, leave requests, and payroll
2. **HR** - Manage employees, approve leave requests, view reports
3. **Admin** - Full system access with all HR capabilities plus system settings

## 🔒 Authentication

The application includes:
- User registration and login
- Protected routes based on authentication status
- Role-based access control
- Session management

## 📝 Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow ESLint rules
- Use functional components with hooks
- Follow the existing folder structure

### Component Guidelines
- Keep components small and focused
- Use TypeScript interfaces for props
- Leverage shadcn/ui components when possible
- Maintain consistent styling with Tailwind CSS

### Adding New Features
1. Create types in `src/types/`
2. Add components in `src/components/`
3. Create pages in `src/pages/`
4. Update routes in `src/App.tsx`
5. Add mock data if needed in `src/data/`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 👥 Support

For support, please open an issue in the repository or contact the development team.

---

Built with ❤️ using React, TypeScript, and modern web technologies.
