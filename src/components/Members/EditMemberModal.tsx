import React from "react";
import { Modal, Form, Input, Select, DatePicker } from "antd";
import { User } from "../../types/user";
import dayjs from "dayjs";

interface EditMemberModalProps {
  visible: boolean;
  member: User | null;
  onCancel: () => void;
  onSave: (values: Partial<User>) => void;
  loading?: boolean;
}

const EditMemberModal: React.FC<EditMemberModalProps> = ({
  visible,
  member,
  onCancel,
  onSave,
  loading,
}) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (visible && member) {
      form.setFieldsValue({
        ...member,
        joinDate: member.joinedDepartmentAt ? dayjs(member.joinedDepartmentAt) : undefined,
      });
    }
  }, [visible, member, form]);

  const handleSubmit = (values: any) => {
    onSave({
      ...values,
      joinDate: values.joinedDepartmentAt?.format("YYYY-MM-DD"),
    });
  };

  return (
    <Modal
      title="Edit Member"
      open={visible}
      onCancel={onCancel}
      onOk={form.submit}
      confirmLoading={loading}
      className="top-8"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="pt-4"
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please enter name" }]}
        >
          <Input className="rounded-md" />
        </Form.Item>

        <Form.Item
          name="role"
          label="Role"
          rules={[{ required: true, message: "Please select role" }]}
        >
          <Select className="rounded-md">
            <Select.Option value="ADMIN">Admin</Select.Option>
            <Select.Option value="USER">User</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: "Please select status" }]}
        >
          <Select className="rounded-md">
            <Select.Option value="active">Active</Select.Option>
            <Select.Option value="inactive">Inactive</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="joinDate" label="Join Date">
          <DatePicker className="w-full rounded-md" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditMemberModal;
