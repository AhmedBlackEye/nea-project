import {
  pgTable,
  uuid,
  primaryKey,
  varchar,
  integer,
  boolean,
  timestamp,
  char,
  index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { campaigns } from ".";
import { nanoid } from "nanoid";

export const campaignFollowers = pgTable(
  "campaign_followers",
  {
    id: char("id", { length: 12 }).$defaultFn(() => nanoid(12)),
    campaignId: uuid("campaign_id")
      .notNull()
      .references(() => campaigns.id, { onDelete: "cascade" }),
    firstName: varchar("first_name", { length: 255 }),
    lastName: varchar("last_name", { length: 255 }),
    email: varchar("email", { length: 255 }),
    phone: varchar("phone", { length: 25 }),
    rank: integer("rank").notNull(),
    referralAmount: integer("referral_amount").default(0),
    referredBy: char("referred_by", { length: 12 }),
    utmSource: varchar("utm_source"),
    utmMedium: varchar("utm_medium"),
    utmTerm: varchar("utm_term"),
    utmCampaign: varchar("utm_campaign"),
    isOffboarded: boolean("is_offboarded").default(false),
    createdAt: timestamp("created_at", {
      withTimezone: true,
      mode: "string",
    }),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.id, table.campaignId] }),
      campaignIdx: index("campaign_idx").on(table.campaignId),
    };
  },
);

export const campaignFollowersRelations = relations(
  campaignFollowers,
  ({ one }) => ({
    campaign: one(campaigns, {
      fields: [campaignFollowers.campaignId],
      references: [campaigns.id],
    }),
  }),
);
