import React, { useMemo } from 'react';
import { Modal, Form, Select, Button } from 'antd';
import { mockUsers } from '../../data/mockData';

interface AddMemberModalProps {
  visible: boolean;
  onCancel: () => void;
  onAdd: (userIds: string[]) => void;
  loading?: boolean;
  currentMembers: string[];
}

const AddMemberModal: React.FC<AddMemberModalProps> = ({
  visible,
  onCancel,
  onAdd,
  loading,
  currentMembers,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: { userIds: string[] }) => {
    onAdd(values.userIds);
    form.resetFields();
  };

  const availableUsers = useMemo(() => 
    mockUsers.filter(user => !currentMembers.includes(user.id)),
    [currentMembers]
  );

  return (
    <Modal
      title="Add Team Members"
      open={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item
          name="userIds"
          rules={[{ required: true, message: 'Please select members' }]}
        >
          <Select
            mode="multiple"
            placeholder="Select members"
            style={{ width: '100%' }}
          >
            {availableUsers.map(user => (
              <Select.Option key={user.id} value={user.id}>
                {user.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Add Members
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddMemberModal;