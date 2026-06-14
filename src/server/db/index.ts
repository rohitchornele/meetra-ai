import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";
import { pool } from "../corsair";

export const db = drizzle(pool, {
  schema,
});

export * from "./schema";