"use client";

import { Button } from "@/components/ui/button";
import { IconInput } from "@/components/auth/IconInput";
import { AuthLogo } from "@/components/auth/AuthLogo";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error("Registration failed", {
          description: data.error,
        });
        return;
      }

      toast.success("Account created successfully!");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("Registration failed", {
        description: "An unexpected error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-graphite-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8">
        <AuthLogo />
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <IconInput
              id="email"
              name="email"
              type="email"
              icon="mail"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              required
              disabled={isLoading}
            />
          </div>
          
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <IconInput
              id="password"
              name="password"
              type="password"
              icon="lock"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              showPasswordToggle
              required
              disabled={isLoading}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Minimum 8 characters, 1 uppercase letter, 1 number
            </p>
          </div>

          <Button 
            type="submit" 
            disabled={isLoading} 
            className="w-full h-12 bg-primary-green hover:bg-primary-green/90 text-white font-medium rounded-lg"
          >
            {isLoading && <MaterialIcon icon="progress_activity" className="animate-spin" />}
            {isLoading ? "Creating account..." : "Sign up"}
          </Button>
        </form>
        
        <p className="text-center text-sm text-graphite-700 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-primary-green hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
