import React, { useEffect } from "react";
import { Modal, Form, Input, DatePicker } from "antd";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";

interface EditDepartmentModalProps {
  visible: boolean;
  department: any | null;
  onCancel: () => void;
  onSave: (values: any) => void;
}

const EditDepartmentModal: React.FC<EditDepartmentModalProps> = ({
  visible,
  department,
  onCancel,
  onSave,
}) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  useEffect(() => {
    if (visible && department) {
      form.setFieldsValue({
        ...department,
        foundation_date: dayjs(department.foundation_date),
      });
    } else {
      form.resetFields();
    }
  }, [visible, department, form]);

  const handleSubmit = (values: any) => {
    onSave({
      ...values,
      foundation_date: values.foundation_date.toISOString(),
    });
  };

  return (
    <Modal
      title={
        department
          ? t("departments:editDepartment")
          : t("departments:addDepartment")
      }
      open={visible}
      onCancel={onCancel}
      onOk={form.submit}
      okText={t("common:actions.save")}
      cancelText={t("common:actions.cancel")}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="name"
          label={t("departments:name")}
          rules={[{ required: true, message: t("departments:nameRequired") }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="foundation_date"
          label={t("departments:foundationDate")}
          rules={[{ required: true, message: t("departments:dateRequired") }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditDepartmentModal;
