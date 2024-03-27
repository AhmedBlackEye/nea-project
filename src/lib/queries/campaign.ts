"use server";

import { arrayContains, eq, getTableColumns, inArray } from "drizzle-orm";
import { db } from "../drizzle/db";
import {
  campaignAnalytics,
  campaigns,
  usersToWorkspaces,
  workspaces,
} from "../drizzle/schema";
import { TCampaign, TInsertCampaign } from "../drizzle/schema/types";
import { getUser } from "./users";
import { TCampaignWithWorkspace } from "../../types";

export async function createNewCampaign(campaignData: TInsertCampaign) {
  const user = await getUser();
  if (!user) return { error: "User not logged in." };
  try {
    await db.transaction(async (tx) => {
      const [{ campaignId }] = await tx
        .insert(campaigns)
        .values(campaignData)
        .returning({ campaignId: campaigns.id });
    });
    return { error: null };
  } catch (error) {
    console.log("🔴 Creating campaign: ", error);
    return { error: "Something went wrong" };
  }
}

export async function getCampaigns() {
  const user = await getUser();
  if (!user) return { data: null, error: "User not logged in." };
  try {
    const response = await db
      .selectDistinct({
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

export async function checkIfCampaignSlugExists(slug: string) {
  try {
    const response = await db
      .select()
      .from(campaigns)
      .where(eq(campaigns.slug, slug));

    return !!response?.length;
  } catch (error) {
    console.log("🔴 Error at checking if campaign exist: ", error);
    return true;
  }
}
export async function getCampaignData(
  campaignId: string,
): Promise<TCampaign | undefined> {
  const response = await db.query.campaigns.findFirst({
    where: eq(campaigns.id, campaignId),
  });
  return response;
}
