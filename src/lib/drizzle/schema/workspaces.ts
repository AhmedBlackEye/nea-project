import { pgTable, uuid, text } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { campaigns, invitation, usersToWorkspaces } from ".";

export const workspaces = pgTable("workspaces", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description"),
});

export const workspacesRelations = relations(workspaces, ({ many }) => ({
  campaign: many(campaigns),
  userToWorkspaces: many(usersToWorkspaces),
  invitation: many(invitation),
}));
