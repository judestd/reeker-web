import React from "react";
import { Form, Modal } from "antd";
import { useTranslation } from "react-i18next";
import { User, UpdateUserInput } from "../../../types/user";
import UserFormFields from "../UserForm/UserFormFields";
import dayjs from "dayjs";
import styles from '../../../styles/common.module.css';

interface EditUserFormProps {
  open: boolean;
  user: User | null;
  onCancel: () => void;
  onSubmit: (id: string, values: UpdateUserInput) => Promise<void>;
  loading?: boolean;
}

const EditUserForm: React.FC<EditUserFormProps> = ({
  open,
  user,
  onCancel,
  onSubmit,
  loading,
}) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  React.useEffect(() => {
    if (user) {
      form.setFieldsValue({
        ...user,
        birthday: user.birthday ? dayjs(user.birthday) : undefined,
        province: user.province,
        district: user.district,
        ward: user.ward,
      });
    } else {
      form.resetFields();
    }
  }, [user, form]);

  const handleSubmit = async (values: UpdateUserInput) => {
    if (user) {
      await onSubmit(user._id, values);
    }
  };

  return (
    <Modal
      title={t("users:editUser")}
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
        onFinish={handleSubmit}
        className="mt-4"
      >
        <UserFormFields form={form} isEditing={true} />
      </Form>
    </Modal>
  );
};

export default EditUserForm;
