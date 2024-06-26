import { pgEnum } from "drizzle-orm/pg-core";

export const pricingType = pgEnum("pricing_type", ["recurring", "one_time"]);
export const pricingPlanInterval = pgEnum("pricing_plan_interval", [
  "year",
  "month",
  "week",
  "day",
]);
export const subscriptionStatus = pgEnum("subscription_status", [
  "unpaid",
  "past_due",
  "incomplete_expired",
  "incomplete",
  "canceled",
  "active",
  "trialing",
]);

export const invitationStatus = pgEnum("invitation_status", [
  "ACCEPTED",
  "PENDING",
  "REVOKED",
]);

export const workspaceRole = pgEnum("workspace_role", [
  "ADMIN",
  "USER",
  "VIEWER",
]);
