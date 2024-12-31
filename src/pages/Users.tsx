// src/pages/Users.tsx
import React, { useState } from 'react';
import { Button, Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useUsers } from '../hooks/useUsers';
import { columns } from './Users/columns';
import UserForm from '../components/Users/UserForm';
import type { CreateUserInput } from '../types/user';
import { useLocation } from '../hooks/useLocation';

const Users: React.FC = () => {
  const { users, loading, pagination, fetchUsers, createUser } = useUsers();
  const [formVisible, setFormVisible] = useState(false);
  const { provinces, districts, wards } = useLocation();

  const handleCreate = async (values: CreateUserInput) => {
    const province = provinces.find(p => p.code === values.province)
    const district = districts.find(d => d.code === values.district)
    const ward = wards.find(w => w.code === values.ward)

    values.province = province?._id
    values.district = district?._id
    values.ward = ward?._id

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
