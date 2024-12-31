import React from 'react';
import { Table, Card } from 'antd';
import { User } from '../../../types/user';
import { useUserColumns } from './columns';
import UserListHeader from './UserListHeader';
import { PaginationParams } from '../../../types/common';

interface UserListProps {
  users: User[];
  loading: boolean;
  total: number;
  pagination: PaginationParams;
  onPaginationChange: (page: number, pageSize: number) => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onSearch: (value: string) => void;
  onFilterChange: (filters: Record<string, any>) => void;
}

const UserList: React.FC<UserListProps> = ({
  users,
  loading,
  total,
  pagination,
  onPaginationChange,
  onEdit,
  onDelete,
  onSearch,
  onFilterChange,
}) => {
  const columns = useUserColumns({ onEdit, onDelete });

  return (
    <Card>
      <UserListHeader onSearch={onSearch} onFilterChange={onFilterChange} />
      <Table
        columns={columns}
        dataSource={users}
        loading={loading}
        rowKey="id"
        pagination={{
          total,
          current: pagination.page,
          pageSize: pagination.limit,
          onChange: onPaginationChange,
          showSizeChanger: true,
        }}
      />
    </Card>
  );
};

export default UserList;