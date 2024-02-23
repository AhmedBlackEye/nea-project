import { InferInsertModel, InferSelectModel } from "drizzle-orm";

import { users } from "./users";

import { campaigns } from "./campaigns";
import { invitation } from "./invitation";
import { notification } from "./notification";
import { userToCampaigns } from "./userToCampaigns";
import { campaignFollowers } from "./campaignFollowers";
import { campaignAnalytics } from "./campaignAnalytics";
import { customers, subscriptions, prices, products } from "./stripe";

export type TSelectUser = InferSelectModel<typeof users>;
export type TInsertUser = InferInsertModel<typeof users>;

export type TSelectCampaign = InferSelectModel<typeof campaigns>;
export type TInsertCampaign = InferInsertModel<typeof campaigns>;

export type TSelectInvitation = InferSelectModel<typeof invitation>;
export type TInsertInvitation = InferInsertModel<typeof invitation>;

export type TSelectNotification = InferSelectModel<typeof notification>;
export type TInsertNotification = InferInsertModel<typeof notification>;

export type TSelectUserToCampaigns = InferSelectModel<typeof userToCampaigns>;
export type TInsertUserToCampaigns = InferInsertModel<typeof userToCampaigns>;

export type TSelectCampaignFollowers = InferSelectModel<
  typeof campaignFollowers
>;
export type TInsertCampaignFollowers = InferInsertModel<
  typeof campaignFollowers
>;

export type TSelectCampaignAnalytics = InferSelectModel<
  typeof campaignAnalytics
>;

export type TSelectCustomers = InferSelectModel<typeof customers>;
export type TInsertCustomers = InferInsertModel<typeof customers>;

export type TSelectSubscriptions = InferSelectModel<typeof subscriptions>;
export type TInsertSubscriptions = InferInsertModel<typeof subscriptions>;

export type TSelectPrices = InferSelectModel<typeof prices>;
export type TInsertPrices = InferInsertModel<typeof prices>;

export type TSelectProducts = InferSelectModel<typeof products>;
export type TInsertProducts = InferInsertModel<typeof products>;
