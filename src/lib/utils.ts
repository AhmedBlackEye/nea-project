import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { TCampaignWithWorkspace, TOrganizedWorksapces } from "../types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getNameInitials(fullName: string, joinWith = "") {
  return fullName
    .split(" ")
    .map((n: string) => n[0])
    .join(joinWith);
}

export function groupCampaignsUsingWorkspace(campaignArray: any[]) {
  const workspaceMap = new Map<string, TOrganizedWorksapces>();

  for (const campaignObj of campaignArray) {
    const { workspaceId, workspaceName, workspaceDescription, ...fields } =
      campaignObj;

    if (!workspaceMap.has(workspaceId)) {
      workspaceMap.set(workspaceId, {
        workspaceId,
        workspaceName: workspaceName || "",
        workspaceDescription: workspaceDescription || null,
        campaigns: [],
      });
    }

    workspaceMap.get(workspaceId)!.campaigns.push({ ...fields, workspaceId });
  }

  return Array.from(workspaceMap.values());
}

// export function getClassName(
//   obj: { color: string; backgroundColor: string } | undefined,
// ): string {
//   if (!obj) return "";
//   return obj.values().join(" ");
// }
