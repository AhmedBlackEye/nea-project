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

import { campaignAnalytics, workspaces, campaignFollowers } from ".";

export const campaigns = pgTable(
  "campaigns",
  {
    id: uuid("project_id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    slug: varchar("slug").unique(),
    customURL: varchar("custom_url"),
    description: text("description"),
    content: text("content"),
    analyticsId: uuid("analytics_id").references(() => campaignAnalytics.id),
    workspaceId: uuid("workspace_id").references(() => workspaces.id),
    answers: jsonb("answers"),
    settings: jsonb("settings"),
    createdAt: timestamp("created_at", {
      withTimezone: true,
      mode: "string",
    }),
    startsAt: timestamp("starts_at", {
      withTimezone: true,
      mode: "string",
    }),
    endsAt: timestamp("ends_at", {
      withTimezone: true,
      mode: "string",
    }),
  },
  (table) => {
    return {
      slugIdx: index("slug_idx").on(table.slug),
      analyticsIdIdx: index("analytics_id_idx").on(table.analyticsId),
      workspaceIdIdx: index("workspace_id_idx").on(table.workspaceId),
    };
  },
);

export const campaignsRelations = relations(campaigns, ({ one, many }) => ({
  analytics: one(campaignAnalytics, {
    fields: [campaigns.analyticsId],
    references: [campaignAnalytics.id],
  }),
  workspace: one(workspaces, {
    fields: [campaigns.workspaceId],
    references: [workspaces.id],
  }),
  campaignFollowers: many(campaignFollowers),
}));
