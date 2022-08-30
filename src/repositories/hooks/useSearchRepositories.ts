import { gql, useQuery } from "@apollo/client";
import { Repository } from "../models/Repository";

const DEFAULT_BEFORE_CURSOR = 1;

interface SearchRepositoriesData {
  search: {
    repositories: Repository[];
    repositoryCount: number;
  };
}

interface SearchRepositoryVariables {
  query: string;
  first: number;
  before?: string;
}

const SEARCH_REPOSITORIES = gql`
  query ($query: String!, $first: Int!, $before: String) {
    search(type: REPOSITORY, query: $query, first: $first, before: $before) {
      repositories: nodes {
        ... on Repository {
          id
          nameWithOwner
          homepageUrl
          forkCount
          stargazerCount
        }
      }
      repositoryCount
    }
  }
`;

// GitHub expects a Base64 encoded cursor:{value} format for pagination
// e.g. 1 -> cursor:1 -> Y3Vyc29yOjE=
export const encodeCursor = (value: number) => btoa(`cursor:${value.toString()}`);

interface Options {
  query: string;
  first: number;
  cursor?: string | number;
}

export const useSearchRepositories = (options: Options) => {
  const { query, first, cursor = DEFAULT_BEFORE_CURSOR } = options;

  const before = typeof cursor === "number" ? encodeCursor(cursor) : cursor;

  return useQuery<SearchRepositoriesData, SearchRepositoryVariables>(SEARCH_REPOSITORIES, {
    variables: {
      query,
      first,
      before,
    },
  });
};
