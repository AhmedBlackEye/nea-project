"use server";

import { arrayContains, eq, inArray } from "drizzle-orm";
import { db } from "../drizzle/db";
import {
  campaignAnalytics,
  campaigns,
  usersToWorkspaces,
} from "../drizzle/schema";
import { TInsertCampaign } from "../drizzle/schema/types";
import { getUser } from "./users";
import { getWorkspaces } from "./workspaces";

export async function createNewCampaign({
  campaignData,
}: {
  campaignData: TInsertCampaign;
}) {
  const user = await getUser();
  if (!user) return { error: "User not logged in." };
  try {
    await db.transaction(async (tx) => {
      const [{ campaignId }] = await tx
        .insert(campaigns)
        .values(campaignData)
        .returning({ campaignId: campaigns.id });
      // Creating a campaign anlytics row, using the generated
      await tx.insert(campaignAnalytics).values({
        campaignId: campaignId,
      });
    });
    return { error: null };
  } catch (error) {
    return { error: error };
  }
}

export async function getCampaigns() {
  const user = await getUser();
  if (!user) return { data: null, error: "User not logged in." };
  const response = await db
    .select()
    .from(campaigns)
    .leftJoin(usersToWorkspaces, eq(usersToWorkspaces.userId, user.id));
  console.log(response);
}
