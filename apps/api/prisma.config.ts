import "dotenv/config";
import { defineConfig, env } from "prisma/config";

const username = encodeURIComponent(env("DB_USER"));
const password = encodeURIComponent(env("DB_PASSWORD"));
const host = env("DB_HOST");
const port = env("DB_PORT");
const database = env("DB_NAME");

const connectionString =
  `postgresql://${username}:${password}@${host}:${port}/${database}?schema=public`;

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: connectionString,
  },
});
