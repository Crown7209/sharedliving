import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CreateExampleInput = {
  language: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type EditExampleInput = {
  language: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type Example = {
  __typename?: 'Example';
  id: Scalars['ID']['output'];
  language: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']['output']>;
  createExample: Example;
  deleteExample: Scalars['Boolean']['output'];
  updateExample: Example;
};


export type MutationCreateExampleArgs = {
  input: CreateExampleInput;
};


export type MutationDeleteExampleArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateExampleArgs = {
  id: Scalars['ID']['input'];
  input: EditExampleInput;
};

export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']['output']>;
  getExample: Array<Example>;
};

export type GetExampleQueryVariables = Exact<{ [key: string]: never; }>;


export type GetExampleQuery = { __typename?: 'Query', getExample: Array<{ __typename?: 'Example', id: string, name: string, language: string }> };


export const GetExampleDocument = gql`
    query GetExample {
  getExample {
    id
    name
    language
  }
}
    `;

/**
 * __useGetExampleQuery__
 *
 * To run a query within a React component, call `useGetExampleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExampleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExampleQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetExampleQuery(baseOptions?: Apollo.QueryHookOptions<GetExampleQuery, GetExampleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetExampleQuery, GetExampleQueryVariables>(GetExampleDocument, options);
      }
export function useGetExampleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetExampleQuery, GetExampleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetExampleQuery, GetExampleQueryVariables>(GetExampleDocument, options);
        }
export function useGetExampleSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetExampleQuery, GetExampleQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetExampleQuery, GetExampleQueryVariables>(GetExampleDocument, options);
        }
export type GetExampleQueryHookResult = ReturnType<typeof useGetExampleQuery>;
export type GetExampleLazyQueryHookResult = ReturnType<typeof useGetExampleLazyQuery>;
export type GetExampleSuspenseQueryHookResult = ReturnType<typeof useGetExampleSuspenseQuery>;
export type GetExampleQueryResult = Apollo.QueryResult<GetExampleQuery, GetExampleQueryVariables>;