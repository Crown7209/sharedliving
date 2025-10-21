"use client";

import { ApolloProvider } from "@apollo/client";
import { ReactNode } from "react";

import { client } from "../utils/apollo-client";

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
