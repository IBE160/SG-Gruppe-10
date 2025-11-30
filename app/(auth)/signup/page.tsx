"use client";

import { signUp } from "@/lib/supabase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useEffect } from "react";
import { toast } from "sonner";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Creating account..." : "Register"}
    </Button>
  );
}

export default function SignupPage() {
  const [state, formAction] = useActionState(signUp, null);

  useEffect(() => {
    if (state?.error) {
      toast.error("Registration failed", {
        description: state.error,
      });
    }
  }, [state]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-6 p-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Create an account</h1>
          <p className="text-gray-500">Enter your details to get started</p>
        </div>
        
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
            />
            <p className="text-xs text-gray-500">
              Minimum 8 characters, 1 uppercase letter, 1 number
            </p>
          </div>

          <SubmitButton />
        </form>
        
        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a href="/login" className="font-medium hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
