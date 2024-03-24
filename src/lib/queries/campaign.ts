"use server";

import { arrayContains, eq, getTableColumns, inArray } from "drizzle-orm";
import { db } from "../drizzle/db";
import {
  campaignAnalytics,
  campaigns,
  usersToWorkspaces,
  workspaces,
} from "../drizzle/schema";
import { TInsertCampaign } from "../drizzle/schema/types";
import { getUser } from "./users";

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
      // // Creating a campaign anlytics row, using the generated
      // await tx.insert(campaignAnalytics).values({
      //   campaignId: campaignId,
      // });
    });
    return { error: null };
  } catch (error) {
    console.log("🔴 Creating campaign: ", error);
    return { error: "Something went wrong" };
  }
}

export async function getCampaigns() {
  const user = await getUser();
  console.error("this is an error");
  if (!user) return { data: null, error: "User not logged in." };
  try {
    const response = await db
      .select({
        workspaceName: workspaces.name,
        workspaceDescription: workspaces.description,
        ...getTableColumns(campaigns),
      })
      .from(campaigns)
      .innerJoin(workspaces, eq(workspaces.id, campaigns.workspaceId))
      .innerJoin(usersToWorkspaces, eq(usersToWorkspaces.userId, user.id));
    return { data: response, error: null };
  } catch (error) {
    console.log("🔴 Error getting campaigns: ", error);
    return { data: null, error: "Something went wrong" };
  }
}
