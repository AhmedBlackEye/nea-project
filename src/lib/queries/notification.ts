"use server";

import { db } from "../drizzle/db";
import { notification, notificationRelations } from "../drizzle/schema";
import { createServerClient } from "../supabase/server";

const supabase = createServerClient();

type GetNotificationProps = {
  userId: string;
  isRead?: boolean;
};

// export async function getNotification() {
//   const supabase = createServerClient()
//   const {data: {user}} = await supabase.auth.getUser()
//   const notifications = await db.query.notification.findMany({
// columns: {
//   userId: notification.userId
// }
//   })
// }
