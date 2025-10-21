import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema:
    process.env.BACKEND_URI ||
    process.env.NEXT_PUBLIC_API_URL ||
    "https://sera-backend.vercel.app/api/graphql",
  documents: ["./src/graphql/**/*.graphql"],

  generates: {
    "src/generated/graphql.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        reactApolloVersion: 3,
        withHooks: true,
        withHOC: false,
        withComponent: false,
        exportFragmentSpreadSubTypes: true,
        dedupeFragments: true,
        preResolveTypes: true,
        skipTypename: false,
        namingConvention: {
          typeNames: "pascal-case#pascalCase",
          enumValues: "upper-case#upperCase",
        },
      },
    },
    "./src/generated/graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
};

export default config;
