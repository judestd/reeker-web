// src/components/Users/EditUserForm/index.tsx
import React from "react";
import { Form, Modal } from "antd";
import { User, UpdateUserInput } from "../../../types/user";
import UserFormFields from "../UserForm/UserFormFields";
import dayjs from "dayjs";

interface EditUserFormProps {
  open: boolean;
  user: User | null;
  onCancel: () => void;
  onSubmit: (id: string, values: UpdateUserInput) => Promise<void>;
  loading?: boolean;
}

const EditUserForm: React.FC<EditUserFormProps> = ({
  open,
  user,
  onCancel,
  onSubmit,
  loading,
}) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (user) {
      form.setFieldsValue({
        ...user,
        birthday: user.birthday ? dayjs(user.birthday) : undefined,
        province: user.province,
        district: user.district,
        ward: user.ward,
      });
    } else {
      form.resetFields();
    }
  }, [user, form]);

  const handleSubmit = async (values: UpdateUserInput) => {
    if (user) {
      await onSubmit(user.id, values);
    }
  };

  return (
    <Modal
      title="Edit User"
      open={open}
      onCancel={onCancel}
      onOk={form.submit}
      confirmLoading={loading}
      width={720}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <UserFormFields form={form} isEditing={true} />
      </Form>
    </Modal>
  );
};

export default EditUserForm;
