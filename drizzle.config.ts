import type { Config } from "drizzle-kit";
export default {
  schema: "./src/drizzle/schema/*",
  out: "./migration",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL || "",
  },
} satisfies Config;
