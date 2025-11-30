import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export async function POST(request: Request) {
  const body = await request.json();

  // Validate inputs
  const validation = loginSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.issues[0].message },
      { status: 400 }
    );
  }

  const { email, password } = validation.data;

  // Create Supabase client
  const supabase = await createClient();

  // Sign in user
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 }
    );
  }

  // Check if user and session exist
  if (!data.user || !data.session) {
    return NextResponse.json(
      { error: "Failed to authenticate" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
