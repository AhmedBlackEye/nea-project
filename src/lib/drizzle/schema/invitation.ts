import {
  pgTable,
  uuid,
  timestamp,
  text,
  primaryKey,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { invitationStatus } from "./enums";
import { campaigns, users } from ".";

export const invitation = pgTable(
  "invitation",
  {
    email: text("email")
      .notNull()
      .references(() => users.email),
    workSpaceId: uuid("campaign_id")
      .notNull()
      .references(() => campaigns.id, { onDelete: "cascade" }),
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
  campaign: one(campaigns, {
    fields: [invitation.workSpaceId],
    references: [campaigns.id],
  }),
  email: one(users, {
    fields: [invitation.email],
    references: [users.email],
  }),
}));
