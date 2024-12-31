import type { ColumnsType } from 'antd/es/table';
import { Space, Button } from 'antd';
import type { User } from '../../../types/user';
import { renderStatus, renderRole } from './renderers';

export const getMemberColumns = (onEdit: (user: User) => void): ColumnsType<User> => [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a: User, b: User) => a.name.localeCompare(b.name),
    className: 'text-gray-900 font-medium',
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
    render: renderRole,
    filters: [
      { text: 'Admin', value: 'ADMIN' },
      { text: 'User', value: 'USER' },
    ],
    onFilter: (value: any, record: User) => record.role === value,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: renderStatus,
    filters: [
      { text: 'Active', value: 'active' },
      { text: 'Inactive', value: 'inactive' },
    ],
    onFilter: (value: any, record: User) => record.status === value,
  },
  {
    title: 'Join Date',
    dataIndex: 'joinDate',
    key: 'joinDate',
    sorter: (a: User, b: User) => {
      if (!a.joinDate || !b.joinDate) return 0;
      return new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime();
    },
    className: 'text-gray-600',
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (_: unknown, record: User) => (
      <Space>
        <Button 
          type="primary"
          onClick={() => onEdit(record)}
          className="hover:opacity-90"
        >
          Edit
        </Button>
      </Space>
    ),
  },
];