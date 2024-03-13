"use server";

import { createServerClient } from "@lib/supabase/server";
import { redirect } from "next/navigation";

type Props = {
  email: string;
  password: string;
};

export async function loginUser({ email, password }: Props) {
  const supabase = createServerClient();
  const response = await supabase.auth.signInWithPassword({ email, password });
  return response;
}

export async function signUpUser({ email, password }: Props) {
  const supabase = createServerClient();
  const response = await supabase.auth.signUp({
    email,
    password,
  });
  return response;
}

export async function resetPassword(email: string) {
  const supabase = createServerClient();
  const response = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `http://${process.env.NEXT_PUBLIC_APP_DOMAIN}/reset-password`,
  });
  return response;
}

export async function updatePassword(newPassword: string) {
  const supabase = createServerClient();
  const response = await supabase.auth.updateUser({ password: newPassword });
  return response;
}

export async function signWithGoogle() {
  const supabase = createServerClient();
  const response = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
      redirectTo: `http://${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/auth/callback`,
    },
  });

  return response;
}

export async function signOut() {
  const supabase = createServerClient();
  const response = await supabase.auth.signOut();
  return response;
}
