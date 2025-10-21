import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// Create an HTTP link to the GraphQL API
const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/graphql",
  credentials: "include",
  fetchOptions: {
    mode: "cors",
  },
});

// Add the auth token to the request headers
const authLink = setContext((_, { headers }) => {
  // Get the authentication token from local storage if it exists
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : "";

  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token || "",
    },
  };
});

// Create the Apollo Client
export const client = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "network-only",
      errorPolicy: "all",
    },
    query: {
      fetchPolicy: "network-only",
      errorPolicy: "all",
    },
    mutate: {
      errorPolicy: "all",
    },
  },
});
