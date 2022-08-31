import { Layout, Space } from "antd";
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

  const onSearch = (query: string) => {
    setCurrentPage(1);
    setQuery(query);
  }

  const onPageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout.Content style={{ width: "100%", maxWidth: "600px", margin: "16px auto" }}>
        <Space direction="vertical" style={{ width: "100%" }}>
          <RepositoriesSearchInput placeholder={INITIAL_SEARCH_QUERY} onSearch={onSearch} />
          <RepositoriesTable
            data={data?.search.repositories}
            loading={loading}
            pagination={{
              current: currentPage,
              pageSize,
              total: data?.search.repositoryCount,
              onChange: onPageChange,
            }}
          />
        </Space>
      </Layout.Content>
    </Layout>
  );
};
