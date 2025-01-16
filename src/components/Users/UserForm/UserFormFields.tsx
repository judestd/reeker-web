import React, { useState, useEffect } from "react";
import { Form, Input, Select, DatePicker, message, Typography, Row, Col } from "antd";
import { useTranslation } from "react-i18next";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  PhoneOutlined,
  TeamOutlined,
  BankOutlined,
  CheckCircleOutlined,
  WechatOutlined,
  FacebookOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import LocationSelect from "../../common/LocationSelect";
import { Role, ROLE_NAME, privilegeRoles } from "../../../types/user";
import { Department } from "../../../types/department";
import { departmentApi } from "../../../api/endpoints/department";
import styles from '../../../styles/common.module.css';

const { Title } = Typography;

interface UserFormFieldsProps {
  form: any;
  isEditing?: boolean;
}

const UserFormFields: React.FC<UserFormFieldsProps> = ({ form, isEditing }) => {
  const { t } = useTranslation();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchDepartments();
  }, [page]);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const response = await departmentApi.getAll({
        page,
        limit: 10,
      });

      const departments = response.data.data;
      setDepartments((prevDepartments) => [...prevDepartments, ...departments]);
      setHasMore(page <= response.data.metadata.pagination.totalPages);
    } catch (error) {
      message.error(t("common:errors.fetchFailed"));
    } finally {
      setLoading(false);
    }
  };

  const onPopupScroll = (e: any) => {
    const target = e.target as HTMLDivElement;
    if (
      target.scrollTop + target.offsetHeight >= target.scrollHeight - 5 &&
      hasMore &&
      !loading
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <Row gutter={24}>
      {/* Left Column - Account Information */}
      <Col span={12}>
        <div className="pr-4 border-r border-gray-200">
          <Title level={5} className={styles.sectionTitle}>{t("users:sections.accountInfo")}</Title>
          
          <Form.Item
            name="fullName"
            label={t("users:fields.fullName")}
            rules={[{ required: true, message: t("users:validation.fullName") }]}
          >
            <Input prefix={<UserOutlined className={`${styles.formIcon} ${styles.primaryIcon}`} />} />
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
            <Input prefix={<MailOutlined className={`${styles.formIcon} ${styles.primaryIcon}`} />} />
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
            <Input.Password prefix={<LockOutlined className={`${styles.formIcon} ${styles.primaryIcon}`} />} />
          </Form.Item>

          <Form.Item
            name="phone"
            label={t("users:fields.phone")}
            rules={[{ required: true, message: t("users:validation.phone") }]}
          >
            <Input prefix={<PhoneOutlined className={`${styles.formIcon} ${styles.primaryIcon}`} />} />
          </Form.Item>

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
            <Select
              onPopupScroll={onPopupScroll}
              loading={loading}
              listHeight={100}
              listItemHeight={50}
            >
              {departments.map((dept) => (
                <Select.Option key={dept._id} value={dept._id}>
                  <BankOutlined className={`${styles.formIcon} ${styles.primaryIcon}`} />
                  {dept.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          {/* Role and Status in same row */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="role"
                label={t("users:fields.role")}
                rules={[{ required: true, message: t("users:validation.role") }]}
              >
                <Select prefix={<TeamOutlined className={`${styles.formIcon} ${styles.primaryIcon}`} />}>
                  {Object.entries(Role)
                    .filter(([_, value]) => !privilegeRoles.includes(value))
                    .map(([_, value]) => (
                      <Select.Option key={value} value={value}>
                        {ROLE_NAME[value]}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
            {isEditing && (
              <Col span={12}>
                <Form.Item name="isActive" label={t("users:fields.status")}>
                  <Select>
                    <Select.Option value={true}>
                      <CheckCircleOutlined className={`${styles.formIcon} ${styles.successIcon}`} />
                      {t("users:status.active")}
                    </Select.Option>
                    <Select.Option value={false}>
                      <CheckCircleOutlined className={`${styles.formIcon} ${styles.dangerIcon}`} />
                      {t("users:status.inactive")}
                    </Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            )}
          </Row>
        </div>
      </Col>

      {/* Right Column - Personal Information & Social Media */}
      <Col span={12}>
        <div className="pl-4">
          {/* Personal Information Section */}
          <Title level={5} className={styles.sectionTitle}>{t("users:sections.personalInfo")}</Title>
          
          {/* Gender and Birthday on same row */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="gender" label={t("users:fields.gender")}>
                <Select>
                  <Select.Option value="male">{t("users:gender.male")}</Select.Option>
                  <Select.Option value="female">
                    {t("users:gender.female")}
                  </Select.Option>
                  <Select.Option value="other">{t("users:gender.other")}</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="birthday" label={t("users:fields.birthDay")}>
                <DatePicker format="YYYY-MM-DD" className="w-full" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="addressDetail" label={t("users:fields.address")}>
            <Input prefix={<HomeOutlined className={`${styles.formIcon} ${styles.primaryIcon}`} />} />
          </Form.Item>

          {/* Location fields in one row */}
          <LocationSelect required form={form} />

          {/* Social Media Section */}
          <Title level={5} className={styles.sectionTitle}>{t("users:sections.socialMedia")}</Title>
          
          <Form.Item
            name={["social", "facebook"]}
            label={t("users:fields.facebook")}
          >
            <Input prefix={<FacebookOutlined className={`${styles.formIcon} ${styles.primaryIcon}`} />} />
          </Form.Item>

          <Form.Item name={["social", "zalo"]} label={t("users:fields.zalo")}>
            <Input prefix={<WechatOutlined className={`${styles.formIcon} ${styles.primaryIcon}`} />} />
          </Form.Item>
        </div>
      </Col>
    </Row>
  );
};

export default UserFormFields;
