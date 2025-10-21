"use client";

import { ApolloProvider } from "@apollo/client";
import { ReactNode } from "react";

import { client } from "../utils/apollo-client";
import { AuthProvider } from "../contexts/AuthContext";
import { NotificationProvider } from "../contexts/NotificationContext";

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <NotificationProvider>{children}</NotificationProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}
