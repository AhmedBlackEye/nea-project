"use server";

import { createServerClient } from "../supabase/server";

export async function getUser() {
  const supabase = createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}
