import { pgTable, uuid, jsonb, integer } from "drizzle-orm/pg-core";
import { campaigns } from ".";
import { relations } from "drizzle-orm";

export const campaignAnalytics = pgTable("campaign_analytics", {
  id: uuid("id").defaultRandom().primaryKey(),
  campaignId: uuid("campaign_id").references(() => campaigns.id),
  visits: integer("visits").default(0),
  totalSignUps: integer("total_sign_ups").default(0),
  totalReferrals: integer("total_referrals").default(0),
  totalOffboarded: integer("total_offboarded").default(0),
  utmSources: jsonb("utm_sources")
    .$type<{ [key: string]: number }>()
    .default({}),
  utmMediums: jsonb("utm_mediums")
    .$type<{ [key: string]: number }>()
    .default({}),
  utmTerms: jsonb("utm_terms").$type<{ [key: string]: number }>().default({}),
  utmCampaigns: jsonb("utm_campaigns")
    .$type<{ [key: string]: number }>()
    .default({}),
});

export const campaignsRelations = relations(campaignAnalytics, ({ one }) => ({
  workspace: one(campaigns, {
    fields: [campaignAnalytics.campaignId],
    references: [campaigns.id],
  }),
}));
