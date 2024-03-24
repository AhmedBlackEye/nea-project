import { TCampaign } from "./drizzle/schema/types";

export type TCampaignWithWorkspace = TCampaign & {
  workspaceId: string;
  workspaceName: string;
  workspaceDescription: string | null;
};

export type TOrganizedWorksapces = {
  workspaceId: string;
  workspaceName: string;
  workspaceDescription: string | null;
  campaigns: TCampaign[];
};
