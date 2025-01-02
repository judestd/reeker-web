import React from "react";
import { Form, Input } from "antd";

const { TextArea } = Input;

const TeamDescriptionField: React.FC = () => (
  <Form.Item
    name="description"
    label="Description"
    rules={[{ max: 500, message: "Description cannot exceed 500 characters" }]}
  >
    <TextArea
      placeholder="Enter team description"
      rows={4}
      className="rounded-md"
    />
  </Form.Item>
);

export default TeamDescriptionField;
