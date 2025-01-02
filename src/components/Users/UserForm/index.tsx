// src/components/Users/UserForm/index.tsx
import React from "react";
import { Form, Modal } from "antd";
import { CreateUserInput } from "../../../types/user";
import UserFormFields from "./UserFormFields";

interface UserFormProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: CreateUserInput) => Promise<boolean>;
  loading?: boolean;
  form: any;
}

const UserForm: React.FC<UserFormProps> = ({
  open,
  onCancel,
  onSubmit,
  loading,
  form,
}) => {
  const handleFinish = async (values: CreateUserInput) => {
    const success = await onSubmit(values);
    if (success) {
      form.resetFields();
    }
  };

  return (
    <Modal
      title="Create User"
      open={open}
      onCancel={onCancel}
      onOk={form.submit}
      confirmLoading={loading}
      width={720}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <UserFormFields form={form} />
      </Form>
    </Modal>
  );
};

export default UserForm;
