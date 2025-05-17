import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/sonner';
import { Mail, Lock, User } from 'lucide-react';

// Login form schema
const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

// Signup form schema
const signupSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z.string().min(6, { message: 'Please confirm your password' }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

const Auth = () => {
  const { isAuthenticated, isLoading, signIn, signUp } = useAuth();
  const [activeView, setActiveView] = useState<string>("login");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Login form
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Signup form
  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onLoginSubmit = async (data: LoginFormValues) => {
    try {
      setIsSubmitting(true);
      await signIn(data.email, data.password);
      toast.success('Login successful!');
    } catch (error) {
      // Error is handled in the auth context
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSignupSubmit = async (data: SignupFormValues) => {
    try {
      setIsSubmitting(true);
      await signUp(data.email, data.password, data.fullName);
      setActiveView("login");
    } catch (error) {
      // Error is handled in the auth context
    } finally {
      setIsSubmitting(false);
    }
  };

  // Redirect if user is already logged in
  if (isAuthenticated && !isLoading) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="h-screen w-full flex overflow-hidden">
      {/* Left side - Login/Signup Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 lg:px-16">
        <div className="w-full max-w-md">
          {/* Logo/Brand */}
          <div className="mb-8">
            <h1 className="text-4xl font-extrabold text-gray-900">Nxttask</h1>
          </div>

          {/* Greeting */}
          <div className="mb-12">
            <h2 className="text-5xl font-bold text-gray-900 mb-2">Hello!</h2>
            <p className="text-gray-500">Welcome back to the community</p>
          </div>

          {/* Login View */}
          {activeView === "login" && (
            <>
              <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                  <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Email" {...field} className="h-12 text-base" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="password" placeholder="Password" {...field} className="h-12 text-base" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-end">
                    <button type="button" className="text-sm text-blue-500 hover:text-blue-700">
                      Forgot Password?
                    </button>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full h-12 rounded-full bg-black hover:bg-gray-800"
                    disabled={isSubmitting || isLoading}
                  >
                    {isSubmitting ? "Logging in..." : "Log in"}
                  </Button>
                </form>
              </Form>
              
              <p className="text-center mt-6">
                Don't have an account?{" "}
                <button 
                  onClick={() => setActiveView("signup")}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Sign up
                </button>
              </p>
            </>
          )}

          {/* Signup View */}
          {activeView === "signup" && (
            <>
              <Form {...signupForm}>
                <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-4">
                  <FormField
                    control={signupForm.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Full Name" {...field} className="h-12 text-base" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={signupForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Email" {...field} className="h-12 text-base" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={signupForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="password" placeholder="Password" {...field} className="h-12 text-base" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={signupForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="password" placeholder="Confirm Password" {...field} className="h-12 text-base" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full h-12 rounded-full bg-black hover:bg-gray-800" 
                    disabled={isSubmitting || isLoading}
                  >
                    {isSubmitting ? "Creating Account..." : "Create Account"}
                  </Button>
                </form>
              </Form>
              
              <p className="text-center mt-6">
                Already have an account?{" "}
                <button 
                  onClick={() => setActiveView("login")}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Log in
                </button>
              </p>
            </>
          )}
        </div>
      </div>

      {/* Right side - Purple Gradient Background */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-500 to-blue-600 flex-col justify-center px-12 text-white">
        <div className="absolute top-8 right-8 flex items-center gap-4">
          <button className="text-white hover:text-white/80">Sign up</button>
          <Button variant="outline" className="rounded-full border-white text-white hover:bg-white/10 hover:text-white">
            Join Us
          </Button>
        </div>
        
        <div>
          <h2 className="text-4xl font-bold mb-4">Intelligent. Streamlined. Collaborative</h2>
          <p className="opacity-80">Where AI meets productivity. Streamline tasks, calendars, and team communication in one powerful platform.</p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
