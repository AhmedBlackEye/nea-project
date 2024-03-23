import { pgTable, uuid, primaryKey } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { users, workspaces } from ".";
import { workspaceRole } from "./enums";

export const usersToWorkspaces = pgTable(
  "user_to_workspaces",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    workspaceId: uuid("campaign_id")
      .notNull()
      .references(() => workspaces.id, { onDelete: "cascade" }),
    role: workspaceRole("role").notNull(),
  },
  (table) => {
    return { pk: primaryKey({ columns: [table.userId, table.workspaceId] }) };
  },
);

export const usersToWorkspacesRelations = relations(
  usersToWorkspaces,
  ({ one }) => ({
    users: one(users, {
      fields: [usersToWorkspaces.userId],
      references: [users.id],
    }),
    workspaces: one(workspaces, {
      fields: [usersToWorkspaces.workspaceId],
      references: [workspaces.id],
    }),
  }),
);
