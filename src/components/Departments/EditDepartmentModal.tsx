import React, { useEffect, useState } from "react";
import { Modal, Form, Input, DatePicker, Select, message } from "antd";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { userApi } from "../../api/endpoints/user";
import { User } from "../../types/user";
import { Department } from "../../types/department";

interface EditDepartmentModalProps {
  visible: boolean;
  department: Department | null;
  onCancel: () => void;
  onSave: (values: Department) => void;
}

const EditDepartmentModal: React.FC<EditDepartmentModalProps> = ({
  visible,
  department,
  onCancel,
  onSave,
}) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const [users, setUsers] = useState<Partial<User>[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (visible) {
      fetchUsers();
    }
  }, [visible, page]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await userApi.getUsers({
        page,
        limit: 10,
        isFreeDepartmentManager: 1,
      });

      const users = response.data.data;
      setUsers((prevUsers) => {
        if (page === 1 && department?.owner) {
          return [department?.owner!, ...prevUsers, ...users];
        }
        return [...prevUsers, ...users];
      });
      setHasMore(page <= response.data.metadata.pagination.totalPages);
    } catch (error) {
      message.error(t("common:errors.fetchFailed"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (visible && department) {
      form.setFieldsValue({
        ...department,
        foundationDate: dayjs(department.foundationDate),
      });
    } else {
      form.resetFields();
    }
  }, [visible, department, form]);

  const handleSubmit = (values: any) => {
    onSave({
      ...values,
      foundationDate: values.foundationDate.toISOString(),
    });
  };

  return (
    <Modal
      title={department ? t("departments:edit") : t("departments:create")}
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

        <Form.Item name="description" label={t("departments:description")}>
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          name="foundationDate"
          label={t("departments:foundationDate")}
          rules={[{ required: true, message: t("departments:dateRequired") }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="ownerId"
          label={t("departments:owner")}
          rules={[{ required: false, message: t("departments:ownerRequired") }]}
        >
          <Select
            onPopupScroll={(e) => {
              const target = e.target as HTMLDivElement;
              if (
                target.scrollTop + target.offsetHeight >=
                  target.scrollHeight - 5 &&
                hasMore &&
                !loading
              ) {
                setPage((prevPage) => prevPage + 1);
              }
            }}
            loading={loading}
            listHeight={100}
            listItemHeight={50}
          >
            {users.map((user) => (
              <Select.Option key={user._id} value={user._id}>
                {user.fullName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditDepartmentModal;
