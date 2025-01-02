import React from "react";
import { Form, Button, Card } from "antd";
import { Team } from "../../../types/user";
import TeamNameField from "./TeamNameField";
import TeamDescriptionField from "./TeamDescriptionField";

interface TeamFormProps {
  initialValues?: Partial<Team> | null;
  onSubmit: (values: Partial<Team>) => void;
  loading?: boolean;
}

const TeamForm: React.FC<TeamFormProps> = ({
  initialValues,
  onSubmit,
  loading,
}) => {
  const [form] = Form.useForm<Partial<Team>>();

  React.useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  return (
    <Card
      title={initialValues ? "Edit Team" : "Create New Team"}
      className="shadow-md"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        className="space-y-4"
      >
        <TeamNameField />
        <TeamDescriptionField />

        <Form.Item className="mb-0">
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="w-full md:w-auto"
          >
            {initialValues ? "Update Team" : "Create Team"}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default TeamForm;
