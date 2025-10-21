import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextRequest } from "next/server";

import { resolvers } from "./resolvers";
import { typeDefs } from "./schemas";
import { connectToDatabase } from "./utils/connect-to-db";

export interface Context {
  userId: string | null;
}

try {
  await connectToDatabase();
  // console.log("Connected to MongoDB");
} catch {
  // console.error("Failed to connect to MongoDB:", error);
}

const server = new ApolloServer<Context>({
  resolvers,
  typeDefs,
  introspection: true,
});

export const handler = startServerAndCreateNextHandler<NextRequest, Context>(
  server
);
