import { db } from "../drizzle/db";
import { subscriptions } from "../drizzle/schema";


export async function getUserSubscriptionStatus() {
    try {
const data = db.select().from(subscriptions)
    } catch(error) {

    }
}