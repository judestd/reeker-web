import React, { useEffect } from "react";
import { Modal, Form, Input, Button } from "antd";
import { useTranslation } from "react-i18next";
import { RealEstateSource } from "../../types/realEstateSource";

interface EditRealEstateSourceModalProps {
  visible: boolean;
  source: RealEstateSource | null;
  onCancel: () => void;
  onSave: (values: any) => void;
}

const EditRealEstateSourceModal: React.FC<EditRealEstateSourceModalProps> = ({
  visible,
  source,
  onCancel,
  onSave,
}) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  useEffect(() => {
    if (visible && source) {
      form.setFieldsValue(source);
    } else {
      form.resetFields();
    }
  }, [visible, source, form]);

  return (
    <Modal
      title={source ? t("realEstateSource:edit") : t("realEstateSource:create")}
      open={visible}
      onCancel={onCancel}
      width={800}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          {t("common:actions.cancel")}
        </Button>,
        <Button key="submit" type="primary" onClick={() => form.submit()}>
          {t("common:actions.save")}
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" onFinish={onSave}>
        <Form.Item
          name="name"
          label={t("realEstateSource:name")}
          rules={[
            { required: true, message: t("realEstateSource:nameRequired") },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="description"
          label={t("realEstateSource:description")}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditRealEstateSourceModal;
