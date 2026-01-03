import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
<<<<<<< HEAD
import { Building2, Mail, Lock, User, Hash, AlertCircle, CheckCircle } from 'lucide-react';
=======
import { Mail, Lock, User, Hash, AlertCircle } from 'lucide-react';
>>>>>>> 6af5d5313fb8af80786c9682aa36b8b43a7c60ad
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserRole } from '@/types/hrms';
<<<<<<< HEAD
=======
import { AuthPage } from '@/components/ui/auth-page';
>>>>>>> 6af5d5313fb8af80786c9682aa36b8b43a7c60ad

export default function Signup() {
  const [formData, setFormData] = useState({
    employeeId: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'employee' as UserRole,
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    const result = await signup({
      employeeId: formData.employeeId,
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      role: formData.role,
    });

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error || 'Signup failed');
    }
    setIsLoading(false);
  };

  return (
<<<<<<< HEAD
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-sidebar items-center justify-center p-12">
        <div className="max-w-md text-center">
          <div className="flex justify-center mb-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-sidebar-primary">
              <Building2 className="h-8 w-8 text-sidebar-primary-foreground" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-sidebar-foreground mb-4">Dayflow</h1>
          <p className="text-lg text-sidebar-muted">
            Enterprise Human Resource Management System
          </p>
          
          <div className="mt-12 text-left space-y-6">
            <h3 className="text-sm font-medium text-sidebar-foreground uppercase tracking-wider">
              Employee Onboarding
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-sidebar-primary mt-0.5" />
                <div>
                  <p className="text-sidebar-foreground">Quick Registration</p>
                  <p className="text-sm text-sidebar-muted">Get started in minutes</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-sidebar-primary mt-0.5" />
                <div>
                  <p className="text-sidebar-foreground">Role-Based Access</p>
                  <p className="text-sm text-sidebar-muted">Permissions based on your role</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-sidebar-primary mt-0.5" />
                <div>
                  <p className="text-sidebar-foreground">Secure Platform</p>
                  <p className="text-sm text-sidebar-muted">Enterprise-grade security</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Signup form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Building2 className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold">Dayflow</span>
            </div>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-foreground">Create Account</h2>
            <p className="mt-2 text-muted-foreground">Register as a new employee</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-md bg-destructive/10 text-destructive text-sm">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="employeeId">Employee ID</Label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
=======
    <AuthPage mode="signup">
      <form onSubmit={handleSubmit} className="space-y-3">
            {error && (
              <div className="flex items-center gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm animate-in slide-in-from-top-1">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="employeeId" className="text-xs font-semibold text-foreground">Employee ID</Label>
              <div className="relative group">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
>>>>>>> 6af5d5313fb8af80786c9682aa36b8b43a7c60ad
                <Input
                  id="employeeId"
                  placeholder="EMP001"
                  value={formData.employeeId}
                  onChange={(e) => handleChange('employeeId', e.target.value)}
<<<<<<< HEAD
                  className="pl-10"
=======
                  className="pl-10 h-10 text-sm border-2 focus-visible:ring-2 focus-visible:ring-primary/20 transition-all"
>>>>>>> 6af5d5313fb8af80786c9682aa36b8b43a7c60ad
                  required
                />
              </div>
            </div>

<<<<<<< HEAD
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
=======
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="firstName" className="text-xs font-semibold text-foreground">First Name</Label>
                <div className="relative group">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
>>>>>>> 6af5d5313fb8af80786c9682aa36b8b43a7c60ad
                  <Input
                    id="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
<<<<<<< HEAD
                    className="pl-10"
=======
                    className="pl-10 h-10 text-sm border-2 focus-visible:ring-2 focus-visible:ring-primary/20 transition-all"
>>>>>>> 6af5d5313fb8af80786c9682aa36b8b43a7c60ad
                    required
                  />
                </div>
              </div>
<<<<<<< HEAD
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
=======
              <div className="space-y-1.5">
                <Label htmlFor="lastName" className="text-xs font-semibold text-foreground">Last Name</Label>
>>>>>>> 6af5d5313fb8af80786c9682aa36b8b43a7c60ad
                <Input
                  id="lastName"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
<<<<<<< HEAD
=======
                  className="h-10 text-sm border-2 focus-visible:ring-2 focus-visible:ring-primary/20 transition-all"
>>>>>>> 6af5d5313fb8af80786c9682aa36b8b43a7c60ad
                  required
                />
              </div>
            </div>

<<<<<<< HEAD
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
=======
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-semibold text-foreground">Email address</Label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
>>>>>>> 6af5d5313fb8af80786c9682aa36b8b43a7c60ad
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
<<<<<<< HEAD
                  className="pl-10"
=======
                  className="pl-10 h-10 text-sm border-2 focus-visible:ring-2 focus-visible:ring-primary/20 transition-all"
>>>>>>> 6af5d5313fb8af80786c9682aa36b8b43a7c60ad
                  required
                />
              </div>
            </div>

<<<<<<< HEAD
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={formData.role} onValueChange={(value) => handleChange('role', value)}>
                <SelectTrigger>
=======
            <div className="space-y-1.5">
              <Label htmlFor="role" className="text-xs font-semibold text-foreground">Role</Label>
              <Select value={formData.role} onValueChange={(value) => handleChange('role', value)}>
                <SelectTrigger className="h-10 text-sm border-2 focus:ring-2 focus:ring-primary/20">
>>>>>>> 6af5d5313fb8af80786c9682aa36b8b43a7c60ad
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="employee">Employee</SelectItem>
                  <SelectItem value="hr">HR Manager</SelectItem>
                </SelectContent>
              </Select>
            </div>

<<<<<<< HEAD
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
=======
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-xs font-semibold text-foreground">Password</Label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
>>>>>>> 6af5d5313fb8af80786c9682aa36b8b43a7c60ad
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
<<<<<<< HEAD
                  className="pl-10"
=======
                  className="pl-10 h-10 text-sm border-2 focus-visible:ring-2 focus-visible:ring-primary/20 transition-all"
>>>>>>> 6af5d5313fb8af80786c9682aa36b8b43a7c60ad
                  required
                />
              </div>
            </div>

<<<<<<< HEAD
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
=======
            <div className="space-y-1.5">
              <Label htmlFor="confirmPassword" className="text-xs font-semibold text-foreground">Confirm Password</Label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
>>>>>>> 6af5d5313fb8af80786c9682aa36b8b43a7c60ad
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
<<<<<<< HEAD
                  className="pl-10"
=======
                  className="pl-10 h-10 text-sm border-2 focus-visible:ring-2 focus-visible:ring-primary/20 transition-all"
>>>>>>> 6af5d5313fb8af80786c9682aa36b8b43a7c60ad
                  required
                />
              </div>
            </div>

<<<<<<< HEAD
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
=======
            <Button 
              type="submit" 
              className="w-full h-10 text-sm font-semibold bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-200 mt-2" 
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></span>
                  Creating Account...
                </span>
              ) : (
                'Create Account'
              )}
            </Button>
      </form>

      <div className="mt-4 text-center text-xs">
        <span className="text-muted-foreground">Already have an account?{' '}</span>
        <Link to="/login" className="text-primary font-semibold hover:underline underline-offset-4 transition-colors">
          Sign in
        </Link>
      </div>
    </AuthPage>
>>>>>>> 6af5d5313fb8af80786c9682aa36b8b43a7c60ad
  );
}
