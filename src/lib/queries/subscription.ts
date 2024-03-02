"use server";

import { db } from "../drizzle/db";
import { TSubscriptions } from "../drizzle/schema/types";

export async function getUserSubscriptionStatus(userId: string) {
  try {
    const data = await db.query.subscriptions.findFirst({
      where: (subscription, { eq }) => eq(subscription.userId, userId),
    });

    if (data) return { data: data as TSubscriptions, error: null };
  } catch (error) {
    console.error(`🔴 getUserSubscriptionStatus produced: ${error}`);
  }
  return { data: null, error: null };
}
