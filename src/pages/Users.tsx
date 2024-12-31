// src/pages/Users.tsx
import React, { useState } from 'react';
import { Button, Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useUsers } from '../hooks/useUsers';
import { columns } from './Users/columns';
import UserForm from '../components/Users/UserForm';
import type { CreateUserInput } from '../types/user';

const Users: React.FC = () => {
  const { users, loading, pagination, fetchUsers, createUser } = useUsers();
  const [formVisible, setFormVisible] = useState(false);

  const handleCreate = async (values: CreateUserInput) => {
    const success = await createUser(values);
    if (success) {
      setFormVisible(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-4 flex justify-between">
        <h1 className="text-2xl">Users</h1>
        <Button 
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setFormVisible(true)}
        >
          Create User
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={users}
        loading={loading}
        pagination={{
          current: pagination?.page,
          pageSize: pagination?.limit,
          total: pagination?.totalDocs,
          onChange: (page, pageSize) => fetchUsers(page, pageSize)
        }}
        rowKey="id"
      />

      <UserForm
        open={formVisible}
        onCancel={() => setFormVisible(false)}
        onSubmit={handleCreate}
        loading={loading}
      />
    </div>
  );
};

export default Users;
