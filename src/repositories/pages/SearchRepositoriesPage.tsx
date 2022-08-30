import { Space } from "antd";
import React, { useState } from "react";
import { RepositoriesSearchInput } from "../components/RepositoriesSearchInput";
import { RepositoriesTable } from "../components/RepositoriesTable";
import { useSearchRepositories } from "../hooks/useSearchRepositories";

const INITIAL_SEARCH_QUERY = "react";
const INITIAL_CURRENT_PAGE = 1;
const INITAL_PAGE_SIZE = 10;

export const SearchRepositoriesPage: React.FC = () => {
  const [query, setQuery] = useState(INITIAL_SEARCH_QUERY);
  const [currentPage, setCurrentPage] = useState(INITIAL_CURRENT_PAGE);
  const [pageSize, setPageSize] = useState(INITAL_PAGE_SIZE);

  const { data, loading, error } = useSearchRepositories({
    query,
    first: pageSize,
    // AntD table page index starts at 1
    // but the Github pagination cursor starts at 0.
    // To retrieve the correct page of results from Github
    // we must take the AntD page value minus 1.
    cursor: currentPage - 1,
  });

  if (error) {
    <div>{error.message}</div>;
  }

  const onPageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <RepositoriesSearchInput placeholder={INITIAL_SEARCH_QUERY} onSearch={setQuery} />
      <RepositoriesTable
        data={data?.search.repositories}
        loading={loading}
        pagination={{
          page: currentPage,
          pageSize,
          total: data?.search.repositoryCount,
          onChange: onPageChange,
        }}
      />
    </Space>
  );
};
