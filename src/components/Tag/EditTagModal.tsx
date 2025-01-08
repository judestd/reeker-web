import React, { useEffect } from "react";
import { Modal, Form, Input } from "antd";
import { useTranslation } from "react-i18next";
import { Tag } from "../../types/tag";

interface EditTagModalProps {
  visible: boolean;
  tag: Tag | null;
  onCancel: () => void;
  onSave: (values: { name: string }) => void;
}

const EditTagModal: React.FC<EditTagModalProps> = ({
  visible,
  tag,
  onCancel,
  onSave,
}) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  useEffect(() => {
    if (visible && tag) {
      form.setFieldsValue(tag);
    } else {
      form.resetFields();
    }
  }, [visible, tag, form]);

  const handleSubmit = (values: { name: string }) => {
    onSave(values);
  };

  return (
    <Modal
      title={tag ? t("tags:edit") : t("tags:create")}
      open={visible}
      onCancel={onCancel}
      onOk={form.submit}
      okText={t("common:actions.save")}
      cancelText={t("common:actions.cancel")}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="name"
          label={t("tags:name")}
          rules={[{ required: true, message: t("tags:nameRequired") }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditTagModal; 