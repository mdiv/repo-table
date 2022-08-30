import React from "react";
import { RepositoriesTable } from "../components/RepositoriesTable";
import { useSearchRepositories } from "../hooks/useSearchRepositories";

export const SearchRepositoriesPage: React.FC = () => {
  const { data, loading, error } = useSearchRepositories({
    query: "react",
    first: 10,
    cursor: 0,
  });

  if (error) {
    <div>{error.message}</div>;
  }

  return <RepositoriesTable data={data?.search.repositories} loading={loading} />;
};
