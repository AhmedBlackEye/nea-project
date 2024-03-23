import {
  pgTable,
  uuid,
  timestamp,
  text,
  primaryKey,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { invitationStatus } from "./enums";
import { users, workspaces } from ".";

export const invitation = pgTable(
  "invitation",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    workSpaceId: uuid("campaign_id")
      .notNull()
      .references(() => workspaces.id, { onDelete: "cascade" }),
    status: invitationStatus("status").default("PENDING"),
    createdAt: timestamp("created_at", {
      withTimezone: true,
      mode: "string",
    }).defaultNow(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.userId, table.workSpaceId] }),
    };
  },
);

export const invitationRelations = relations(invitation, ({ one }) => ({
  workspace: one(workspaces, {
    fields: [invitation.workSpaceId],
    references: [workspaces.id],
  }),
  user: one(users, {
    fields: [invitation.userId],
    references: [users.id],
  }),
}));
