import React from 'react';
import { Table, Tag, Button } from 'antd';
import { User } from '../../types/user';

interface TeamMembersProps {
  members: User[];
  onRemoveMember: (userId: string) => void;
  loading?: boolean;
}

const TeamMembers: React.FC<TeamMembersProps> = ({ members, onRemoveMember, loading }) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => <Tag color="blue">{role}</Tag>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>{status}</Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: User) => (
        <Button danger onClick={() => onRemoveMember(record.id)}>
          Remove
        </Button>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={members}
      loading={loading}
      rowKey="id"
      pagination={false}
    />
  );
};

export default TeamMembers;