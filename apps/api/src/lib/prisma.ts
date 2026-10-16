
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";

const connectionString =
  `postgresql://${encodeURIComponent(process.env.DB_USER ?? "")}:` +
  `${encodeURIComponent(process.env.DB_PASSWORD ?? "")}@` +
  `${process.env.DB_HOST}:${process.env.DB_PORT}/` +
  `${process.env.DB_NAME}?schema=public`;

const adapter = new PrismaPg({ connectionString });

export const prisma = new PrismaClient({ adapter });
