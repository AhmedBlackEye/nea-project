import { InferInsertModel, InferSelectModel } from "drizzle-orm";

import { users } from "./users";

import { campaigns } from "./campaigns";
import { invitation } from "./invitation";
import { notification } from "./notification";
import { userToCampaigns } from "./user-to-campaigns";
import { campaignFollowers } from "./campaign-followers";
import { campaignAnalytics } from "./campaign-analytics";
import { customers, subscriptions, prices, products } from "./stripe";

export type TUser = InferSelectModel<typeof users>;
export type TInsertUser = InferInsertModel<typeof users>;

export type TCampaign = InferSelectModel<typeof campaigns>;
export type TInsertCampaign = InferInsertModel<typeof campaigns>;

export type TInvitation = InferSelectModel<typeof invitation>;
export type TInsertInvitation = InferInsertModel<typeof invitation>;

export type TNotification = InferSelectModel<typeof notification>;
export type TInsertNotification = InferInsertModel<typeof notification>;

export type TUserToCampaigns = InferSelectModel<typeof userToCampaigns>;
export type TInsertUserToCampaigns = InferInsertModel<typeof userToCampaigns>;

export type TCampaignFollowers = InferSelectModel<typeof campaignFollowers>;
export type TInsertCampaignFollowers = InferInsertModel<
  typeof campaignFollowers
>;

export type TCampaignAnalytics = InferSelectModel<typeof campaignAnalytics>;

export type TCustomers = InferSelectModel<typeof customers>;
export type TInsertCustomers = InferInsertModel<typeof customers>;

export type TSubscriptions = InferSelectModel<typeof subscriptions>;
export type TInsertSubscriptions = InferInsertModel<typeof subscriptions>;

export type TPrices = InferSelectModel<typeof prices>;
export type TInsertPrices = InferInsertModel<typeof prices>;

export type TProducts = InferSelectModel<typeof products>;
export type TInsertProducts = InferInsertModel<typeof products>;
