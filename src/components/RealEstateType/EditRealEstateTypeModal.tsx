import React, { useEffect } from "react";
import { Modal, Form, Input } from "antd";
import { useTranslation } from "react-i18next";
import { RealEstateType } from "../../types/realEstateType";

interface EditRealEstateTypeModalProps {
  visible: boolean;
  realEstateType: RealEstateType | null;
  onCancel: () => void;
  onSave: (values: { name: string }) => void;
}

const EditRealEstateTypeModal: React.FC<EditRealEstateTypeModalProps> = ({
  visible,
  realEstateType,
  onCancel,
  onSave,
}) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  useEffect(() => {
    if (visible && realEstateType) {
      form.setFieldsValue(realEstateType);
    } else {
      form.resetFields();
    }
  }, [visible, realEstateType, form]);

  const handleSubmit = (values: { name: string }) => {
    onSave(values);
  };

  return (
    <Modal
      title={realEstateType ? t("realEstateType:edit") : t("realEstateType:create")}
      open={visible}
      onCancel={onCancel}
      onOk={form.submit}
      okText={t("common:actions.save")}
      cancelText={t("common:actions.cancel")}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="name"
          label={t("realEstateType:name")}
          rules={[{ required: true, message: t("realEstateType:nameRequired") }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditRealEstateTypeModal; 