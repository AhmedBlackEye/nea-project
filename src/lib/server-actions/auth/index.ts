"use server";

import { createClient } from "@lib/supabase/server";

type Props = {
  email: string;
  password: string;
};

const supabase = createClient();

export async function loginUser({ email, password }: Props) {
  const response = await supabase.auth.signInWithPassword({ email, password });
  return response;
}

export async function signUpUser({ email, password }: Props) {
  const response = await supabase.auth.signUp({
    email,
    password,
  });
  return response;
}

export async function resetPassword(email: string) {
  const response = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.HOME_URL}/update-password`,
  });
  return response;
}

export async function updatePassword(newPassword: string) {
  const response = await supabase.auth.updateUser({ password: newPassword });
  return response;
}

export async function signWithGoogle() {
  const response = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });
  return response;
}
