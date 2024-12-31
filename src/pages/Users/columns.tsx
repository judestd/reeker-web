// src/pages/Users/columns.tsx
import { ColumnsType } from 'antd/es/table';
import { Tag, Space } from 'antd';
import { User } from '../../types/user';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

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
  {
    title: 'Actions',
    key: 'actions',
    render: (_, record) => (
      <Space size="middle">
        <EditOutlined 
          style={{ color: '#1890ff', cursor: 'pointer' }}
          // onClick={() => record.onEdit?.(record)}
        />
        <DeleteOutlined 
          style={{ color: '#ff4d4f', cursor: 'pointer' }}
          // onClick={() => record.onDelete?.(record)}
        />
      </Space>
    ),
  }
];
