"use server";

// import { eq } from "drizzle-orm";
// import { db } from "@/lib/drizzle/db";
// import { users } from "@/lib/drizzle/schema";
import { createClient } from "@lib/supabase/server";

type Props = {
  email: string;
  password: string;
};

export async function loginUser({ email, password }: Props) {
  console.log("recieved", email, password);
  const supabase = createClient();
  const response = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return response;
}

export async function signUpUser({ email, password }: Props) {
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
