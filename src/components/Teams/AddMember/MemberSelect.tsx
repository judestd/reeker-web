import React from "react";
import { Form, Select } from "antd";
import { User } from "../../../types/user";

interface MemberSelectProps {
  availableUsers: User[];
}

const MemberSelect: React.FC<MemberSelectProps> = ({ availableUsers }) => (
  <Form.Item
    name="userIds"
    label="Select Members"
    rules={[{ required: true, message: "Please select at least one member" }]}
  >
    <Select
      mode="multiple"
      placeholder="Select team members"
      className="w-full"
      optionFilterProp="children"
    >
      {availableUsers.map((user) => (
        <Select.Option key={user.id} value={user.id}>
          {user.fullName} ({user.role})
        </Select.Option>
      ))}
    </Select>
  </Form.Item>
);

export default MemberSelect;
