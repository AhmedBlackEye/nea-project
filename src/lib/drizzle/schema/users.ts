import {
  pgTable,
  uuid,
  timestamp,
  text,
  jsonb,
  index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { invitation, notification, subscriptions, usersToWorkspaces } from ".";

export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().notNull(),
    email: text("email").unique(),
    fullName: text("full_name"),
    avatarUrl: text("avatar_url")
  },
  (table) => {
    return {
      emailIdx: index("email_idx").on(table.email),
    };
  },
);

export const userRelations = relations(users, ({ one, many }) => ({
  subscriptions: one(subscriptions, {
    fields: [users.id],
    references: [subscriptions.userId],
  }),
  userToWorkspaces: many(usersToWorkspaces),
  notification: many(notification),
  invitation: many(invitation),
}));
