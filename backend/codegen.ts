import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "src/schemas",
  generates: {
    "src/generated/graphql.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        useIndexSignature: true,
        contextType: "../handler#Context",
        makeResolverTypeCallable: true,
        maybeValue: "T | null",
        avoidOptionals: {
          field: true,
          inputValue: false,
          object: false,
        },
        skipTypename: true,
        enumsAsTypes: true,
        futureProofEnums: true,
        addUnderscoreToArgsType: true,
      },
    },
  },
};

export default config;
