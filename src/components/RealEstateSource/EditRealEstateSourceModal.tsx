import React, { useEffect } from "react";
import { Modal, Form, Input, Button } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import type { RealEstateSource } from "../../types/realEstateSource";
import AreaLocationSelect from "../common/AreaLocationSelect";

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

  const handleSubmit = (values: any) => {
    onSave(values);
  };

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
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="name"
          label={t("realEstateSource:name")}
          rules={[
            { required: true, message: t("realEstateSource:nameRequired") },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.List name="area">
          {(fields, { add, remove }) => (
            <div className="space-y-4">
              {fields.map((field, index) => (
                <div
                  key={field.key}
                  className="relative bg-gray-50 p-6 rounded-lg"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="font-medium">
                      {index === 0 && (
                        <>
                          {t("realEstateSource:area")}
                          <span className="text-red-500 ml-1">*</span>
                        </>
                      )}
                    </div>
                    {fields.length > 1 && (
                      <Button
                        type="text"
                        danger
                        onClick={() => remove(field.name)}
                        className="flex items-center gap-1"
                      >
                        <MinusCircleOutlined />
                        {t("common:actions.delete")}
                      </Button>
                    )}
                  </div>
                  <Form.Item {...field} required={false} className="mb-0">
                    <AreaLocationSelect form={form} fieldName={[field.name]} />
                  </Form.Item>
                </div>
              ))}

              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  {t("realEstateSource:addArea")}
                </Button>
              </Form.Item>
            </div>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
};

export default EditRealEstateSourceModal;
