import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
<<<<<<< HEAD
import { Building2, Mail, Lock, AlertCircle } from 'lucide-react';
=======
import { Mail, Lock, AlertCircle } from 'lucide-react';
>>>>>>> 6af5d5313fb8af80786c9682aa36b8b43a7c60ad
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
<<<<<<< HEAD
=======
import { AuthPage } from '@/components/ui/auth-page';
>>>>>>> 6af5d5313fb8af80786c9682aa36b8b43a7c60ad

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await login(email, password);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error || 'Login failed');
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
          <div className="mt-12 space-y-4 text-left">
            <div className="flex items-center gap-3 text-sidebar-foreground/80">
              <div className="h-2 w-2 rounded-full bg-sidebar-primary" />
              <span>Modular HR modules</span>
            </div>
            <div className="flex items-center gap-3 text-sidebar-foreground/80">
              <div className="h-2 w-2 rounded-full bg-sidebar-primary" />
              <span>Role-based access control</span>
            </div>
            <div className="flex items-center gap-3 text-sidebar-foreground/80">
              <div className="h-2 w-2 rounded-full bg-sidebar-primary" />
              <span>Scalable for organizations</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
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
            <h2 className="text-2xl font-semibold text-foreground">Welcome back</h2>
            <p className="mt-2 text-muted-foreground">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-md bg-destructive/10 text-destructive text-sm">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
=======
    <AuthPage mode="login">
      <form onSubmit={handleSubmit} className="space-y-3">
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-xs animate-in slide-in-from-top-1">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-semibold text-foreground">Email address</Label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
>>>>>>> 6af5d5313fb8af80786c9682aa36b8b43a7c60ad
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary font-medium hover:underline">
              Sign up
            </Link>
          </div>

          {/* Demo credentials */}
          <div className="mt-8 p-4 rounded-md bg-muted/50 border border-border">
            <p className="text-sm font-medium text-foreground mb-2">Demo Credentials</p>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p><span className="font-medium">Admin:</span> admin@dayflow.com</p>
              <p><span className="font-medium">HR:</span> hr@dayflow.com</p>
              <p><span className="font-medium">Employee:</span> employee@dayflow.com</p>
              <p><span className="font-medium">Password:</span> demo123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
=======
            <Button 
              type="submit" 
              className="w-full h-10 text-sm font-semibold bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-200" 
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="h-3 w-3 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></span>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </Button>
      </form>

      <div className="mt-4 text-center text-xs">
        <span className="text-muted-foreground">Don't have an account?{' '}</span>
        <Link to="/signup" className="text-primary font-semibold hover:underline underline-offset-4 transition-colors">
          Sign up
        </Link>
      </div>

      {/* Demo credentials */}
      <div className="mt-4 p-3 rounded-xl bg-gradient-to-br from-muted/80 to-muted/40 border-2 border-border/50 backdrop-blur-sm shadow-sm">
        <p className="text-xs font-semibold text-foreground mb-2 flex items-center gap-2">
          <div className="h-1 w-1 rounded-full bg-primary"></div>
          Demo Credentials
        </p>
        <div className="space-y-1 text-xs">
          <div className="flex items-center justify-between py-1 border-b border-border/30 last:border-0">
            <span className="font-medium text-foreground/70">Admin:</span>
            <span className="text-muted-foreground font-mono text-[10px]">admin@worksphere.com</span>
          </div>
          <div className="flex items-center justify-between py-1 border-b border-border/30 last:border-0">
            <span className="font-medium text-foreground/70">HR:</span>
            <span className="text-muted-foreground font-mono text-[10px]">hr@worksphere.com</span>
          </div>
          <div className="flex items-center justify-between py-1 border-b border-border/30 last:border-0">
            <span className="font-medium text-foreground/70">Employee:</span>
            <span className="text-muted-foreground font-mono text-[10px]">employee@worksphere.com</span>
          </div>
          <div className="flex items-center justify-between py-1">
            <span className="font-medium text-foreground/70">Password:</span>
            <span className="text-muted-foreground font-mono text-[10px]">demo123</span>
          </div>
        </div>
      </div>
    </AuthPage>
>>>>>>> 6af5d5313fb8af80786c9682aa36b8b43a7c60ad
  );
}
