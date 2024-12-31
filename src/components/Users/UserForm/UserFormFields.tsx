// src/components/Users/UserForm/UserFormFields.tsx
import React from "react";
import { Form, Input, Select, DatePicker } from "antd";
import LocationSelect from "../../common/LocationSelect";
import { Role, Name_Role } from "../../../types/user";

const UserFormFields: React.FC = () => (
  <>
    <Form.Item name="fullName" label="Full Name" rules={[{ required: true }]}>
      <Input />
    </Form.Item>

    <Form.Item
      name="email"
      label="Email"
      rules={[{ required: true, type: "email" }]}
    >
      <Input />
    </Form.Item>

    <Form.Item name="password" label="Password" rules={[{ required: true }]}>
      <Input.Password />
    </Form.Item>

    <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
      <Input />
    </Form.Item>

    <Form.Item name="role" label="Role" rules={[{ required: true }]}>
      <Select>
        <Select.Option value={Role.OWNER}>{Name_Role[Role.OWNER]}</Select.Option>
        <Select.Option value={Role.OWNER_MANAGER}>{Name_Role[Role.OWNER_MANAGER]}</Select.Option>
        <Select.Option value={Role.CUSTOMER}>{Name_Role[Role.CUSTOMER]}</Select.Option>
        <Select.Option value={Role.CUSTOMER_MANAGER}>{Name_Role[Role.CUSTOMER_MANAGER]}</Select.Option>
      </Select>
    </Form.Item>

    <Form.Item name="gender" label="Gender">
      <Select>
        <Select.Option value="male">Male</Select.Option>
        <Select.Option value="female">Female</Select.Option>
        <Select.Option value="other">Other</Select.Option>
      </Select>
    </Form.Item>

    <Form.Item name="birthday" label="Birthday">
      <DatePicker format="YYYY-MM-DD" />
    </Form.Item>

    <Form.Item name={["social", "facebook"]} label="Facebook">
      <Input />
    </Form.Item>

    <Form.Item name={["social", "zalo"]} label="Zalo">
      <Input />
    </Form.Item>

    <Form.Item name="addressDetail" label="Address">
      <Input />
    </Form.Item>
    <LocationSelect required />
  </>
);

export default UserFormFields;
