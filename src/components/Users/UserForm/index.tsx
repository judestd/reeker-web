// src/components/Users/UserForm/index.tsx
import React from 'react';
import { Form, Modal } from 'antd';
import { CreateUserInput } from '../../../types/user';
import UserFormFields from './UserFormFields';

interface UserFormProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: CreateUserInput) => Promise<void>;
  loading?: boolean;
}

const UserForm: React.FC<UserFormProps> = ({
  open,
  onCancel,
  onSubmit,
  loading
}) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title="Create User"
      open={open}
      onCancel={onCancel}
      onOk={form.submit}
      confirmLoading={loading}
      width={720}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
      >
        <UserFormFields />
      </Form>
    </Modal>
  );
};

export default UserForm;
