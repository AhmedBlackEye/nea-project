import {
  pgTable,
  uuid,
  primaryKey,
  varchar,
  integer,
  boolean,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { campaigns } from ".";
import { nanoid } from "nanoid";

export const campaignFollowers = pgTable(
  "campaign_followers",
  {
    id: varchar("id", { length: 10 }).$defaultFn(() => nanoid(10)),
    campaignId: uuid("campaign_id")
      .notNull()
      .references(() => campaigns.id, { onDelete: "cascade" }),
    firstName: varchar("first_name", { length: 255 }),
    lastName: varchar("last_name", { length: 255 }),
    email: varchar("email", { length: 255 }),
    phone: varchar("phone", { length: 25 }),
    rank: integer("rank").notNull(),
    referredBy: varchar("referred_by", { length: 10 }),
    utmSource: varchar("utm_source"),
    utmCampaign: varchar("utm_campaign"),
    isOffboarded: boolean("is_offboarded").default(false),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.id, table.campaignId] }),
    };
  }
);

export const campaignFollowersRelations = relations(
  campaignFollowers,
  ({ one }) => ({
    referral: one(campaignFollowers, {
      fields: [campaignFollowers.referredBy],
      references: [campaignFollowers.id],
    }),
    campaign: one(campaigns, {
      fields: [campaignFollowers.campaignId],
      references: [campaigns.id],
    }),
  })
);
