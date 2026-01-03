import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Clock, 
  CalendarDays, 
  Wallet, 
  BarChart3, 
  Settings, 
  LogOut,
  Building2
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Employees', href: '/employees', icon: Users },
  { name: 'Attendance', href: '/attendance', icon: Clock },
  { name: 'Leave', href: '/leave', icon: CalendarDays },
  { name: 'Payroll', href: '/payroll', icon: Wallet },
  { name: 'Reports', href: '/reports', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const location = useLocation();
  const { logout } = useAuth();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-60 bg-sidebar border-r border-sidebar-border">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 px-4 border-b border-sidebar-border">
        <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-sidebar-primary to-sidebar-primary/80 shadow-lg">
          <svg className="h-6 w-6 text-sidebar-primary-foreground" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.1"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <h1 className="text-lg font-bold text-sidebar-foreground tracking-tight">Dayflow</h1>
          <p className="text-xs text-sidebar-muted font-medium">HR Suite</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 p-3">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href || 
            (item.href !== '/dashboard' && location.pathname.startsWith(item.href));
          
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={cn(
                'sidebar-nav-item',
                isActive && 'active'
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-sidebar-border">
        <button 
          onClick={logout}
          className="sidebar-nav-item w-full text-sidebar-muted hover:text-sidebar-foreground"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
