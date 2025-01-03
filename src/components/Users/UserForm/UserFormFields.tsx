import React from "react";
import { Form, Input, Select, DatePicker } from "antd";
import { useTranslation } from "react-i18next";
import LocationSelect from "../../common/LocationSelect";
import { Role, Name_Role, privilegeRoles } from "../../../types/user";
import { mockDepartments } from "../../../services/mockDepartmentService";

interface UserFormFieldsProps {
  form: any;
  isEditing?: boolean;
}

const UserFormFields: React.FC<UserFormFieldsProps> = ({ form, isEditing }) => {
  const { t } = useTranslation();

  return (
    <>
      <Form.Item
        name="departmentId"
        label={t("users:fields.department")}
        rules={[
          {
            required: false,
            message: t("users:validation.department"),
          },
        ]}
      >
        <Select placeholder={t("users:fields.department")}>
          {mockDepartments.map((dept) => (
            <Select.Option key={dept._id} value={dept._id}>
              {dept.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="fullName"
        label={t("users:fields.fullName")}
        rules={[{ required: true, message: t("users:validation.fullName") }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label={t("users:fields.email")}
        rules={[
          {
            required: true,
            type: "email",
            message: t("users:validation.email"),
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label={t("users:fields.password")}
        rules={
          isEditing
            ? []
            : [{ required: true, message: t("users:validation.password") }]
        }
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="phone"
        label={t("users:fields.phone")}
        rules={[{ required: true, message: t("users:validation.phone") }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="role"
        label={t("users:fields.role")}
        rules={[{ required: true, message: t("users:validation.role") }]}
      >
        <Select>
          {Object.entries(Role)
            .filter(([_, value]) => !privilegeRoles.includes(value))
            .map(([_, value]) => (
              <Select.Option key={value} value={value}>
                {Name_Role[value]}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>

      {isEditing && (
        <Form.Item name="isActive" label={t("users:fields.status")}>
          <Select>
            <Select.Option value={true}>
              {t("users:status.active")}
            </Select.Option>
            <Select.Option value={false}>
              {t("users:status.inactive")}
            </Select.Option>
          </Select>
        </Form.Item>
      )}

      <Form.Item name="gender" label={t("users:fields.gender")}>
        <Select>
          <Select.Option value="male">{t("users:gender.male")}</Select.Option>
          <Select.Option value="female">
            {t("users:gender.female")}
          </Select.Option>
          <Select.Option value="other">{t("users:gender.other")}</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item name="birthday" label={t("users:fields.birthDay")}>
        <DatePicker format="YYYY-MM-DD" />
      </Form.Item>

      <Form.Item
        name={["social", "facebook"]}
        label={t("users:fields.facebook")}
      >
        <Input />
      </Form.Item>

      <Form.Item name={["social", "zalo"]} label={t("users:fields.zalo")}>
        <Input />
      </Form.Item>

      <Form.Item name="addressDetail" label={t("users:fields.address")}>
        <Input />
      </Form.Item>

      <LocationSelect required form={form} />
    </>
  );
};

export default UserFormFields;
