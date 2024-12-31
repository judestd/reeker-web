// src/components/Users/UserForm/UserFormFields.tsx
import React from 'react';
import { Form, Input, Select, DatePicker } from 'antd';
import dayjs from 'dayjs';
import LocationSelect from '../../common/LocationSelect';

const UserFormFields: React.FC = () => (
  <>
    <Form.Item
      name="fullName"
      label="Full Name"
      rules={[{ required: true }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      name="email"
      label="Email"
      rules={[{ required: true, type: 'email' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      name="pwd"
      label="Password"
      rules={[{ required: true }]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item name="phone" label="Phone">
      <Input />
    </Form.Item>

    <Form.Item name="role" label="Role" rules={[{ required: true }]}>
      <Select>
        <Select.Option value="owner">Owner</Select.Option>
        <Select.Option value="admin">Admin</Select.Option>
        <Select.Option value="staff">Staff</Select.Option>
      </Select>
    </Form.Item>

    <Form.Item name="gender" label="Gender">
      <Select>
        <Select.Option value="male">Male</Select.Option>
        <Select.Option value="female">Female</Select.Option>
      </Select>
    </Form.Item>

    <Form.Item name="birthday" label="Birthday">
      <DatePicker format="YYYY-MM-DD" />
    </Form.Item>

    <Form.Item name={['social', 'facebook']} label="Facebook">
      <Input />
    </Form.Item>

    <Form.Item name={['social', 'zalo']} label="Zalo">
      <Input />
    </Form.Item>

    <Form.Item name="addressDetail" label="Address">
      <Input />
    </Form.Item>
    <LocationSelect required />
  </>
);

export default UserFormFields;
