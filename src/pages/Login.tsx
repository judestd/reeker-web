// src/pages/Login.tsx
import React from "react";
import { Form, Input, Button, Card, Checkbox, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useLogin } from "../hooks/useLogin";
import LanguageSwitcher from "../i18n/components/LanguageSwitcher";

const { Title, Text } = Typography;

const Login: React.FC = () => {
  const { handleLogin, loading } = useLogin();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>
      
      <Card className="w-full max-w-[440px] shadow-lg rounded-lg">
        <div className="text-center mb-8">
          <Title level={3} className="text-[#6366f1] m-0">
            {t("auth:login.title")}
          </Title>
          <Text className="text-gray-500 mt-2 block">
            {t("auth:login.subtitle")}
          </Text>
        </div>

        <Form
          name="login"
          onFinish={handleLogin}
          layout="vertical"
          requiredMark={false}
          className="mb-0"
        >
          <Form.Item
            name="email"
            label={t("auth:login.email")}
            rules={[
              { required: true, message: t("auth:login.emailRequired") },
              { type: "email", message: t("auth:login.emailInvalid") }
            ]}
          >
            <Input 
              size="large" 
              placeholder={t("auth:login.emailPlaceholder")}
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label={t("auth:login.password")}
            rules={[{ required: true, message: t("auth:login.passwordRequired") }]}
          >
            <Input.Password 
              size="large" 
              placeholder={t("auth:login.passwordPlaceholder")}
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>{t("auth:login.rememberMe")}</Checkbox>
          </Form.Item>

          <Form.Item className="mb-0">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full h-11 bg-[#6366f1] hover:bg-[#4f46e5] rounded-lg text-base font-medium"
            >
              {t("auth:login.submit")}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
