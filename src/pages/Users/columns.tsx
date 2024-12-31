// src/pages/Users/columns.tsx
import { ColumnsType } from 'antd/es/table';
import { Tag } from 'antd';
import { User } from '../../types/user';

export const columns: ColumnsType<User> = [
  {
    title: 'Full Name',
    dataIndex: 'fullName',
    key: 'fullName',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
    render: (role: string) => (
      <Tag color={role === 'admin' ? 'blue' : 'green'}>
        {role}
      </Tag>
    ),
  },
  {
    title: 'Status',
    dataIndex: 'isActive',
    key: 'isActive',
    render: (isActive: boolean) => (
      <Tag color={isActive ? 'success' : 'error'}>
        {isActive ? 'Active' : 'Inactive'}
      </Tag>
    ),
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Created At',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (date: string) => new Date(date).toLocaleDateString(),
  },
];
