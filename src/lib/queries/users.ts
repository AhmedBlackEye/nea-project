"use server";

import { User } from "@supabase/supabase-js";
import { createServerClient } from "../supabase/server";
import { TInsertWorkspace } from "../drizzle/schema/types";
import { db } from "../drizzle/db";
import { usersToWorkspaces, workspaces } from "../drizzle/schema";

export async function getUser() {
  const supabase = createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}
