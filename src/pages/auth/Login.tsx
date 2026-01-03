import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthPage } from '@/components/ui/auth-page';

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
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-10 text-sm border-2 focus-visible:ring-2 focus-visible:ring-primary/20 transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-xs font-semibold text-foreground">Password</Label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-10 text-sm border-2 focus-visible:ring-2 focus-visible:ring-primary/20 transition-all"
                  required
                />
              </div>
            </div>

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
  );
}
