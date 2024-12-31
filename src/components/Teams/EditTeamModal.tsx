import React from 'react';
import { Modal, Form, Input } from 'antd';
import { Team } from '../../types/user';

interface EditTeamModalProps {
  visible: boolean;
  team: Team | null;
  onCancel: () => void;
  onSave: (values: Partial<Team>) => void;
  loading?: boolean;
}

const EditTeamModal: React.FC<EditTeamModalProps> = ({
  visible,
  team,
  onCancel,
  onSave,
  loading
}) => {
  const [form] = Form.useForm<Partial<Team>>();

  React.useEffect(() => {
    if (visible && team) {
      form.setFieldsValue(team);
    }
  }, [visible, team, form]);

  return (
    <Modal
      title="Edit Team"
      open={visible}
      onCancel={onCancel}
      onOk={form.submit}
      confirmLoading={loading}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onSave}
      >
        <Form.Item
          name="name"
          label="Team Name"
          rules={[
            { required: true, message: 'Please enter team name' },
            { min: 3, message: 'Team name must be at least 3 characters' }
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditTeamModal;