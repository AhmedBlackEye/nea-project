import {
  pgTable,
  uuid,
  timestamp,
  text,
  jsonb,
  index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { invitation, notification, userToCampaigns } from ".";

export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().notNull(),
    email: text("email"),
    fullName: text("full_name"),
    avatarUrl: text("avatar_url"),
    billingAddress: jsonb("billing_address"),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" }),
    paymentMethod: jsonb("payment_method"),
  },
  (table) => {
    return {
      emailIdx: index("email_idx").on(table.email),
    };
  }
);

export const userRelations = relations(users, ({ many }) => ({
  userToCampaigns: many(userToCampaigns),
  notification: many(notification),
  invitation: many(invitation),
}));
