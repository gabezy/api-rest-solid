import "dotenv";
import { randomUUID } from "crypto";
import { type Environment } from "vitest";
import { execSync } from "child_process";
import { PrismaClient } from "@prisma/client";

// postgresql://docker:docker@localhost:5432/apisolid?schema=public

const prisma = new PrismaClient();

const generateDatabaseURL = (schema: string): string => {
  if (process.env.DATABASE_URL === undefined) {
    throw new Error("Please provide a DATABASE_URL environment variable");
  }

  const url = new URL(process.env.DATABASE_URL);

  url.searchParams.set("schema", schema);
  return url.toString();
};

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default <Environment>{
  name: "prisma",
  async setup() {
    const schema = randomUUID();
    const databaseURL = generateDatabaseURL(schema);

    process.env.DATABASE_URL = databaseURL;

    execSync("npx prisma migrate deploy");

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`
        );

        await prisma.$disconnect();
      },
    };
  },
};
