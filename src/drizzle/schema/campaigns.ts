import {
  pgTable,
  uuid,
  timestamp,
  text,
  varchar,
  index,
  jsonb,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { invitation, campaignAnalytics, userToCampaigns } from ".";

export const campaigns = pgTable(
  "campaigns",
  {
    id: uuid("project_id").defaultRandom().primaryKey(),
    slug: varchar("slug").unique(),
    name: text("name").notNull(),
    description: text("description"),
    analytics: uuid("analytics").references(() => campaignAnalytics.id),
    widgetContent: text("widget_content"),
    answers: jsonb("answers"),
    settings: jsonb("settings"),
    endsAt: timestamp("created_at", {
      withTimezone: true,
      mode: "string",
    }),
  },
  (table) => {
    return {
      slugIdx: index("slug_idx").on(table.slug),
    };
  }
);

export const campaignsRelations = relations(campaigns, ({ one, many }) => ({
  userToCampaigns: many(userToCampaigns),
  invitation: many(invitation),
  analytics: one(campaignAnalytics),
}));
