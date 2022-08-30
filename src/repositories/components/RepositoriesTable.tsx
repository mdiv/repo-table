import { Table, Typography } from "antd";
import { ColumnsType } from "antd/lib/table";
import React from "react";
import { Repository } from "../models/Repository";

const COLUMNS: ColumnsType<Repository> = [
  {
    title: "name",
    key: "nameWithOwner",
    dataIndex: "nameWithOwner",
    render: (value, record) => (
      <Typography.Link href={record.url} target="_blank">
        {value}
      </Typography.Link>
    ),
  },
  {
    title: "🌟 stars",
    key: "stargazerCount",
    dataIndex: "stargazerCount",
    render: (value) => `🌟 ${value}`,
  },
  {
    title: "🍴 forks",
    key: "forkCount",
    dataIndex: "forkCount",
    render: (value) => `🍴 ${value}`,
  },
];

interface Props {
  data?: Repository[];
  loading?: boolean;
  pagination?: {
    page?: number;
    pageSize?: number;
    total?: number;
    onChange?: (page: number, pageSize: number) => void;
  };
}

export const RepositoriesTable: React.FC<Props> = (props) => {
  const { data, loading, pagination } = props;

  const keyedData = data?.map((repository) => ({ ...repository, key: repository.id }));

  return (
    <Table
      columns={COLUMNS}
      dataSource={keyedData}
      loading={loading}
      pagination={
        pagination
          ? {
              position: ["bottomCenter"],
              ...pagination,
            }
          : false
      }
    />
  );
};
