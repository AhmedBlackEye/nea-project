"use server";

import { eq } from "drizzle-orm";
import { db } from "@/lib/drizzle/db";
import { users } from "@/lib/drizzle/schema";
import { createClient } from "@lib/supabase/server";

export async function loginUser(email: string, password: string) {
  const supabase = createClient();
  const response = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return response;
}

export async function signUpUser(email: string, password: string) {
  const supabase = createClient();
  //   const data = await db.select().from(users).where(eq(users.email, email));

  //   if (data?.length) return { error: { message: "User already exists", data } };
  const response = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}api/auth/callback`,
    },
  });
  return response;
}
