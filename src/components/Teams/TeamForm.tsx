import React from 'react';
import { Form, Input, Button } from 'antd';
import type { Team } from '../../types/user';

interface TeamFormProps {
  initialValues?: Partial<Team> | null;
  onSubmit: (values: Partial<Team>) => void;
  loading?: boolean;
}

const TeamForm: React.FC<TeamFormProps> = ({ initialValues, onSubmit, loading }) => {
  const [form] = Form.useForm<Partial<Team>>();

  React.useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onSubmit}
    >
      <Form.Item
        name="name"
        label="Team Name"
        rules={[{ required: true, message: 'Please enter team name' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          {initialValues ? 'Update Team' : 'Create Team'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TeamForm;