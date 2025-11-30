import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { z } from "zod";

const signUpSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

export async function POST(request: Request) {
  const body = await request.json();

  // Validate inputs
  const validation = signUpSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.issues[0].message },
      { status: 400 }
    );
  }

  const { email, password } = validation.data;

  // Create Supabase client
  const supabase = await createClient();

  // Sign up user
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    if (error.message.includes("already registered")) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  // Check if user was created and session exists
  if (!data.user || !data.session) {
    return NextResponse.json(
      { error: "Failed to create user account" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
