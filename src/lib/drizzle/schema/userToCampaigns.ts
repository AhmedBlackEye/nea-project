import { pgTable, uuid, primaryKey, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { users, campaigns } from ".";

export const userToCampaigns = pgTable(
  "user_to_campaigns",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id),
    campaignId: uuid("campaign_id")
      .notNull()
      .references(() => campaigns.id),
    isAdmin: boolean("is_admin"),
  },
  (table) => {
    return { pk: primaryKey({ columns: [table.userId, table.campaignId] }) };
  }
);

export const userToCampaignsRelations = relations(
  userToCampaigns,
  ({ one }) => ({
    users: one(users, {
      fields: [userToCampaigns.userId],
      references: [users.id],
    }),
    campaigns: one(campaigns, {
      fields: [userToCampaigns.campaignId],
      references: [campaigns.id],
    }),
  })
);
