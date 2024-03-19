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
    email: text("email")
      .notNull()
      .references(() => users.email),
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
      pk: primaryKey({ columns: [table.email, table.workSpaceId] }),
    };
  },
);

export const invitationRelations = relations(invitation, ({ one }) => ({
  workspace: one(workspaces, {
    fields: [invitation.workSpaceId],
    references: [workspaces.id],
  }),
  email: one(users, {
    fields: [invitation.email],
    references: [users.email],
  }),
}));
