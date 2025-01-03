import React, { useState } from "react";
import { Button, Table, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useUsers } from "../hooks/useUsers";
import { columns } from "./Users/columns";
import UserForm from "../components/Users/UserForm";
import type { CreateUserInput, UpdateUserInput, User } from "../types/user";
import EditUserForm from "../components/Users/EditUserForm";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const Users: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useSelector((state: RootState) => state.auth);
  const {
    users,
    loading,
    pagination,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
  } = useUsers();
  const [formVisible, setFormVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form] = Form.useForm();

  const handleCreate = async (values: CreateUserInput) => {
    if (values.departmentId) {
      values.joinedDepartmentAt = new Date().toISOString();
      values.joinedDepartmentBy = user?.id;
    }

    const success = await createUser(values);
    if (success) {
      setFormVisible(false);
      form.resetFields();
      return true;
    }
    return false;
  };

  const handleUpdate = async (id: string, values: UpdateUserInput) => {
    if (values.departmentId) {
      values.joinedDepartmentAt = new Date().toISOString();
      values.joinedDepartmentBy = user?.id;
    }

    const success = await updateUser(id, values);
    if (success) {
      setEditingUser(null);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteUser(id);
  };

  return (
    <div className="p-6">
      <div className="mb-4 flex justify-between">
        <h1 className="text-2xl">{t("users:title")}</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setFormVisible(true)}
        >
          {t("users:createUser")}
        </Button>
      </div>

      <div style={{ overflowX: "auto" }}>
        <Table
          columns={columns({
            onEdit: (user) => setEditingUser(user),
            onDelete: handleDelete,
            t,
          })}
          dataSource={users}
          loading={loading}
          pagination={{
            current: pagination?.page,
            pageSize: pagination?.limit,
            total: pagination?.totalDocs,
            onChange: (page, pageSize) => fetchUsers(page, pageSize),
          }}
          rowKey="id"
        />
      </div>

      <UserForm
        open={formVisible}
        onCancel={() => setFormVisible(false)}
        onSubmit={handleCreate}
        loading={loading}
        form={form}
      />

      <EditUserForm
        open={!!editingUser}
        user={editingUser}
        onCancel={() => setEditingUser(null)}
        onSubmit={handleUpdate}
        loading={loading}
      />
    </div>
  );
};

export default Users;
