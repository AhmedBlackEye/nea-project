"use server";

import { db } from "../drizzle/db";
import { usersToWorkspaces, workspaces } from "../drizzle/schema";
import { TInsertWorkspace } from "../drizzle/schema/types";
import { getUser } from "./users";

export async function createNewWorkspace({
  workspaceData,
}: {
  workspaceData: TInsertWorkspace;
}) {
  const user = await getUser();
  if (!user) return { error: "User not logged in." };
  try {
    await db.transaction(async (tx) => {
      const [{ workspaceId }] = await tx
        .insert(workspaces)
        .values(workspaceData)
        .returning({ workspaceId: workspaces.id });
      // Creating a relation row in the user to workspace table
      await tx.insert(usersToWorkspaces).values({
        userId: user.id,
        workspaceId: workspaceId,
        role: "ADMIN",
      });
    });
    return { error: null };
  } catch (error) {
    return { error: error };
  }
}

export async function getWorkspaces() {
  const user = await getUser();
  if (!user) return { data: null, error: "User not logged in." };
  try {
    const workspaces = db.query.usersToWorkspaces.findMany({
      where: (u2w, { eq }) => eq(u2w.userId, user.id),
    });
    return { data: workspaces, error: null };
  } catch (error) {
    return { data: null, error: error };
  }
}
