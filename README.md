# Dayflow HR Suite

Enterprise Human Resource Management System built with modern web technologies.

## Project Overview

Dayflow HR Suite is a comprehensive HR management platform designed for enterprises. It provides modules for employee management, attendance tracking, leave management, payroll processing, and reporting.

## Features

- **Employee Management**: Complete employee profiles and directory
- **Attendance Tracking**: Real-time attendance monitoring and reporting
- **Leave Management**: Leave requests, approvals, and balance tracking
- **Payroll Processing**: Salary management and payslip generation
- **Reports & Analytics**: Comprehensive HR reports and insights
- **Role-Based Access Control**: Admin, HR, and Employee roles
- **Dark Mode Support**: Light and dark theme switching
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Technologies Used

This project is built with:

- **Vite** - Fast build tool and dev server
- **TypeScript** - Type-safe JavaScript
- **React 18** - Modern React with hooks
- **React Router** - Client-side routing
- **shadcn/ui** - Beautiful UI components
- **Tailwind CSS** - Utility-first CSS framework
- **TanStack Query** - Data fetching and caching
- **Lucide React** - Icon library

## Getting Started

### Prerequisites

- Node.js (v18 or higher) - [Install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- npm or yarn package manager

### Installation

```sh
# Step 1: Navigate to the project directory
cd dayflow-hr-suite

# Step 2: Install dependencies
npm install

# Step 3: Start the development server
npm run dev
```

The application will be available at `http://localhost:8080` (or the next available port).

### Demo Credentials

You can use these credentials to test the application:

- **Admin**: `admin@dayflow.com` / `demo123`
- **HR Manager**: `hr@dayflow.com` / `demo123`
- **Employee**: `employee@dayflow.com` / `demo123`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
dayflow-hr-suite/
├── src/
│   ├── components/     # Reusable UI components
│   ├── contexts/       # React contexts (Auth, Theme)
│   ├── data/          # Mock data
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility functions
│   ├── pages/         # Page components
│   └── types/         # TypeScript type definitions
├── public/            # Static assets
└── index.html         # HTML entry point
```

## Development

### Working Locally

1. Clone the repository
2. Install dependencies: `npm install`
3. Start dev server: `npm run dev`
4. Open `http://localhost:8080` in your browser

### Building for Production

```sh
npm run build
```

The production build will be in the `dist/` directory.

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

This project is proprietary software. All rights reserved.

## Support

For issues and questions, please contact the development team.
