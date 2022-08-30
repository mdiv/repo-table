import { Input } from 'antd';
import React from 'react';

interface Props {
  placeholder?: string;
  onSearch?: (value: string) => void;
}

export const RepositoriesSearchInput: React.FC<Props> = (props) => {
  const { placeholder, onSearch } = props;

  return <Input.Search placeholder={placeholder} onSearch={onSearch} />
}