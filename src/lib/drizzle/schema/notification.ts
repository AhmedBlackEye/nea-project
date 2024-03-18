import {
  pgTable,
  uuid,
  timestamp,
  text,
  index,
  boolean,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { users } from ".";

export const notification = pgTable(
  "notification",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    description: text("description").notNull(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    isRead: boolean("is_read").default(false),
    createdAt: timestamp("created_at", {
      withTimezone: true,
      mode: "string",
    }).defaultNow(),
  },
  (table) => {
    return {
      sentToIdx: index("index_idx").on(table.userId),
    };
  },
);

export const notificationRelations = relations(notification, ({ one }) => ({
  users: one(users, { fields: [notification.userId], references: [users.id] }),
}));
