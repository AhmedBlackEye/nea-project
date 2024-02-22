import {
  pgTable,
  uuid,
  timestamp,
  text,
  primaryKey,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { invitationStatus } from "./enums";
import { campaigns } from ".";

export const invitation = pgTable(
  "invitation",
  {
    email: text("email").notNull(),
    campaignId: uuid("campaign_id")
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
      pk: primaryKey({ columns: [table.email, table.campaignId] }),
    };
  }
);

export const invitationRelations = relations(invitation, ({ one }) => ({
  campaign: one(campaigns, {
    fields: [invitation.campaignId],
    references: [campaigns.id],
  }),
}));
