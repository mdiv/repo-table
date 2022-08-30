import { Space } from "antd";
import React, { useState } from "react";
import { RepositoriesSearchInput } from "../components/RepositoriesSearchInput";
import { RepositoriesTable } from "../components/RepositoriesTable";
import { useSearchRepositories } from "../hooks/useSearchRepositories";

const INITIAL_SEARCH_QUERY = "react";

export const SearchRepositoriesPage: React.FC = () => {
  const [query, setQuery] = useState(INITIAL_SEARCH_QUERY);

  const { data, loading, error } = useSearchRepositories({
    query,
    first: 10,
    cursor: 0,
  });

  if (error) {
    <div>{error.message}</div>;
  }

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <RepositoriesSearchInput placeholder={INITIAL_SEARCH_QUERY} onSearch={setQuery} />
      <RepositoriesTable data={data?.search.repositories} loading={loading} />
    </Space>
  );
};
