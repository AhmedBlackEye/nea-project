import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as dotenv from "dotenv";

import * as schema from "./schema";

dotenv.config({ path: ".env.local" });

if (!process.env.DATABASE_URL) {
  console.log("🔴 no database URL");
}

const connectionString = process.env.DATABASE_URL || "";
const client = postgres(connectionString, { prepare: false });

export const db = drizzle(client, { schema });
