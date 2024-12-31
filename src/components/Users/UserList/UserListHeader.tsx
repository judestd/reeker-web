import React from 'react';
import { Input, Select, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Search } = Input;

interface UserListHeaderProps {
  onSearch: (value: string) => void;
  onFilterChange: (filters: Record<string, any>) => void;
}

const UserListHeader: React.FC<UserListHeaderProps> = ({
  onSearch,
  onFilterChange,
}) => (
  <Space className="mb-4" size="middle">
    <Search
      placeholder="Search by name or email"
      allowClear
      onSearch={onSearch}
      style={{ width: 300 }}
      prefix={<SearchOutlined />}
    />
    <Select
      placeholder="Filter by role"
      allowClear
      style={{ width: 200 }}
      onChange={(value) => onFilterChange({ role: value })}
      options={[
        { label: 'Admin', value: 'ADMIN' },
        { label: 'User', value: 'USER' },
      ]}
    />
    <Select
      placeholder="Filter by status"
      allowClear
      style={{ width: 200 }}
      onChange={(value) => onFilterChange({ status: value })}
      options={[
        { label: 'Active', value: true },
        { label: 'Inactive', value: false },
      ]}
    />
  </Space>
);

export default UserListHeader;