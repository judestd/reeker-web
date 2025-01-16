import React from "react";
import { Form, Modal } from "antd";
import { useTranslation } from "react-i18next";
import { CreateUserInput } from "../../../types/user";
import UserFormFields from "./UserFormFields";
import styles from '../../../styles/common.module.css';

interface UserFormProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: CreateUserInput) => Promise<boolean>;
  loading?: boolean;
  form: any;
}

const UserForm: React.FC<UserFormProps> = ({
  open,
  onCancel,
  onSubmit,
  loading,
  form,
}) => {
  const { t } = useTranslation();

  const handleFinish = async (values: CreateUserInput) => {
    const success = await onSubmit(values);
    if (success) {
      form.resetFields();
    }
  };

  return (
    <Modal
      title={t("users:createUser")}
      open={open}
      onCancel={onCancel}
      onOk={form.submit}
      confirmLoading={loading}
      width="80%"
      okText={t("common:actions.save")}
      cancelText={t("common:actions.cancel")}
      centered
      okButtonProps={{ className: styles.primaryButton }}
    >
      <Form 
        form={form} 
        layout="vertical" 
        onFinish={handleFinish}
        className="mt-4"
      >
        <UserFormFields form={form} />
      </Form>
    </Modal>
  );
};

export default UserForm;
