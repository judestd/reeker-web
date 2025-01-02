// src/pages/Login.tsx
import React from "react";
import { Form, Input, Button, Card } from "antd";
import { useLogin } from "../hooks/useLogin";

const Login: React.FC = () => {
  const { handleLogin, loading } = useLogin();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card title="Login" className="w-[400px]">
        <Form
          name="login"
          onFinish={handleLogin}
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input size="large" placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password size="large" placeholder="Enter your password" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full"
              size="large"
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
