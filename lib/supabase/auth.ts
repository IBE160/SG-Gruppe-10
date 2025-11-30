"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { z } from "zod";

// Validation schema
const signUpSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

export async function signUp(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Validate inputs
  const validation = signUpSchema.safeParse({ email, password });
  if (!validation.success) {
    return { error: validation.error.issues[0].message };
  }

  // Create Supabase client
  const supabase = await createClient();

  // Sign up user
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    // Handle specific error cases
    if (error.message.includes("already registered")) {
      return { error: "Email already in use" };
    }
    return { error: error.message };
  }

  // Check if user was created and session exists
  if (!data.user || !data.session) {
    return { error: "Failed to create user account" };
  }

  // Session is now set in cookies via the server client
  // Redirect server-side to ensure cookies are sent
  redirect("/dashboard");
}
