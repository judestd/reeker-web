import React from "react";
import { Form, Input } from "antd";

const TeamNameField: React.FC = () => (
  <Form.Item
    name="name"
    label="Team Name"
    rules={[
      { required: true, message: "Please enter team name" },
      { min: 3, message: "Team name must be at least 3 characters" },
      { max: 50, message: "Team name cannot exceed 50 characters" },
    ]}
  >
    <Input placeholder="Enter team name" className="rounded-md" />
  </Form.Item>
);

export default TeamNameField;
