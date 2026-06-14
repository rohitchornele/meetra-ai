import { createCorsair } from "corsair";
import { Pool } from "pg";
import { github } from "@corsair-dev/github";
import "dotenv/config";

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const corsair = createCorsair({
  plugins: [github()],
  database: pool,
  kek: process.env.CORSAIR_KEK!,
  multiTenancy: false,
});