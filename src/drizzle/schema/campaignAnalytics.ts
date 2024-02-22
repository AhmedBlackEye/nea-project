import { pgTable, uuid, jsonb, integer } from "drizzle-orm/pg-core";

export const campaignAnalytics = pgTable("campaign_analytics", {
  id: uuid("id").defaultRandom().primaryKey(),
  visits: integer("visits").default(0),
  totalSignUps: integer("total_sign_ups").default(0),
  totalReferrals: integer("total_referrals").default(0),
  totalOffboarded: integer("total_offboarded").default(0),
  utmSources: jsonb("utm_sources").$type<{ [key: string]: number }>(),
  utmMediums: jsonb("utm_mediums").$type<{ [key: string]: number }>(),
  utmTerms: jsonb("utm_terms").$type<{ [key: string]: number }>(),
});
