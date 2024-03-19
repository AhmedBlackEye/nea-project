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

import { workspaces, campaignFollowers, usersToWorkspaces } from ".";

export const campaigns = pgTable(
  "campaigns",
  {
    id: uuid("project_id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    slug: varchar("slug").unique(),
    customURL: varchar("custom_url"),
    description: text("description"),
    content: text("content").default(""),
    workspaceId: uuid("workspace_id").references(() => workspaces.id),
    answers: jsonb("answers").default({}),
    settings: jsonb("settings").default({}),
    createdAt: timestamp("created_at", {
      withTimezone: true,
      mode: "string",
    }).defaultNow(),
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
      workspaceIdIdx: index("workspace_id_idx").on(table.workspaceId),
    };
  },
);

export const campaignsRelations = relations(campaigns, ({ one, many }) => ({
  workspace: one(workspaces, {
    fields: [campaigns.workspaceId],
    references: [workspaces.id],
  }),
  usersToWorkspaces: one(usersToWorkspaces, {
    fields: [campaigns.workspaceId],
    references: [usersToWorkspaces.workspaceId],
  }),
  campaignFollowers: many(campaignFollowers),
}));
