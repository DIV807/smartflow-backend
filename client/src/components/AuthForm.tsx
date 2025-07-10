import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Zap, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { authApi } from "@/utils/api";
import { loginSchema, signupSchema, type LoginData, type SignupData } from "@shared/schema";

interface AuthFormProps {
  mode: "login" | "signup";
}

export default function AuthForm({ mode }: AuthFormProps) {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { setUser } = useAuth();

  const isLogin = mode === "login";
  const schema = isLogin ? loginSchema : signupSchema;
  
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: isLogin 
      ? { email: "", password: "" }
      : { name: "", email: "", password: "", confirmPassword: "" }
  });

  const authMutation = useMutation({
    mutationFn: isLogin ? authApi.login : authApi.signup,
    onSuccess: (data) => {
      setUser(data.user);
      setLocation("/dashboard");
      toast({
        title: `${isLogin ? "Welcome back" : "Account created"}!`,
        description: `You have successfully ${isLogin ? "signed in" : "signed up"}.`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || `Failed to ${isLogin ? "sign in" : "sign up"}. Please try again.`,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: LoginData | SignupData) => {
    authMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-smartflow-light-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-10 h-10 bg-smartflow-primary rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="ml-2 text-2xl font-bold text-smartflow-dark-navy">SmartFlow</span>
            </div>
            <h2 className="text-2xl font-bold text-smartflow-dark-navy">
              {isLogin ? "Welcome back" : "Create your account"}
            </h2>
            <p className="text-gray-600 mt-2">
              {isLogin ? "Sign in to your account" : "Start your free trial today"}
            </p>
          </div>
          
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {!isLogin && (
              <div>
                <Label htmlFor="name">Full name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  {...form.register("name")}
                  className="mt-2"
                />
                {form.formState.errors.name && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.name.message}</p>
                )}
              </div>
            )}
            
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...form.register("email")}
                className="mt-2"
              />
              {form.formState.errors.email && (
                <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder={isLogin ? "Enter your password" : "Create a password"}
                {...form.register("password")}
                className="mt-2"
              />
              {form.formState.errors.password && (
                <p className="text-red-500 text-sm mt-1">{form.formState.errors.password.message}</p>
              )}
            </div>
            
            {!isLogin && (
              <div>
                <Label htmlFor="confirmPassword">Confirm password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  {...form.register("confirmPassword")}
                  className="mt-2"
                />
                {form.formState.errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.confirmPassword.message}</p>
                )}
              </div>
            )}
            
            {isLogin ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember" className="text-sm">Remember me</Label>
                </div>
                <a href="#" className="text-sm text-smartflow-primary hover:text-smartflow-primary/80 transition-colors">
                  Forgot password?
                </a>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" required />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the{" "}
                  <a href="#" className="text-smartflow-primary hover:text-smartflow-primary/80 transition-colors">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-smartflow-primary hover:text-smartflow-primary/80 transition-colors">
                    Privacy Policy
                  </a>
                </Label>
              </div>
            )}
            
            <Button
              type="submit"
              className="w-full bg-smartflow-primary text-white hover:bg-smartflow-primary/90"
              disabled={authMutation.isPending}
            >
              {authMutation.isPending 
                ? (isLogin ? "Signing in..." : "Creating account...") 
                : (isLogin ? "Sign In" : "Create Account")
              }
            </Button>
          </form>
          
          <div className="text-center mt-6">
            <p className="text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <Link 
                href={isLogin ? "/signup" : "/login"} 
                className="text-smartflow-primary hover:text-smartflow-primary/80 font-medium transition-colors"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </Link>
            </p>
          </div>
          
          <Link href="/" className="mt-4 text-gray-500 hover:text-gray-700 transition-colors flex items-center">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
