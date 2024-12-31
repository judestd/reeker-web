import React from 'react';
import { Modal, Form, Button } from 'antd';
import { User } from '../../../types/user';
import MemberSelect from './MemberSelect';

interface AddMemberModalProps {
  visible: boolean;
  onCancel: () => void;
  onAdd: (userIds: string[]) => void;
  loading?: boolean;
  availableUsers: User[];
}

const AddMemberModal: React.FC<AddMemberModalProps> = ({
  visible,
  onCancel,
  onAdd,
  loading,
  availableUsers,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: { userIds: string[] }) => {
    onAdd(values.userIds);
    form.resetFields();
  };

  return (
    <Modal
      title="Add Team Members"
      open={visible}
      onCancel={onCancel}
      footer={null}
      className="top-8"
    >
      <Form 
        form={form} 
        onFinish={handleSubmit}
        layout="vertical"
        className="pt-4"
      >
        <MemberSelect availableUsers={availableUsers} />
        
        <Form.Item className="mb-0">
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={loading}
            className="w-full"
          >
            Add Members
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddMemberModal;