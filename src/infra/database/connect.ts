import "server-only";

import mysql from "serverless-mysql";

export const db = mysql({
  config: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
});

export async function dbq<T>(
  query: string,
  values?: (string | number)[],
): Promise<T> {
  const results = await db.query<T>(query, values);
  await db.end();
  return results;
}
