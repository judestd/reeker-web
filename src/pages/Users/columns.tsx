import { ColumnsType } from "antd/es/table";
import { Tag, Space, Button, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { ROLE_NAME, Role, User } from "../../types/user";
import { TFunction } from "i18next";
import { Department } from "../../types/department";

interface ColumnProps {
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
  t: TFunction;
  user: User;
}

export const columns = ({
  onEdit,
  onDelete,
  t,
  user,
}: ColumnProps): ColumnsType<User> => [
  {
    title: t("users:fields.fullName"),
    dataIndex: "fullName",
    key: "fullName",
  },
  {
    title: t("users:fields.email"),
    dataIndex: "email",
    key: "email",
  },
  {
    title: t("users:fields.role"),
    dataIndex: "role",
    key: "role",
    render: (role: Role) => (
      <Tag color={role === "admin" ? "blue" : "green"}>{ROLE_NAME[role]}</Tag>
    ),
  },
  {
    title: t("users:fields.department"),
    dataIndex: "department",
    key: "department",
    render: (department: Department) =>
      department?.name ? department.name : "",
  },
  {
    title: t("users:fields.status"),
    dataIndex: "isActive",
    key: "isActive",
    render: (isActive: boolean) => (
      <Tag color={isActive ? "success" : "error"}>
        {isActive ? t("users:status.active") : t("users:status.inactive")}
      </Tag>
    ),
  },
  {
    title: t("users:fields.phone"),
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: t("users:fields.birthDay"),
    dataIndex: "birthday",
    key: "birthday",
    render: (date: string) => (date ? new Date(date).toLocaleDateString() : ""),
  },
  {
    title: t("users:fields.gender"),
    dataIndex: "gender",
    key: "gender",
    render: (gender: string) => (gender ? t(`users:gender.${gender}`) : ""),
  },
  // {
  //   title: t("users:fields.address"),
  //   dataIndex: "address",
  //   key: "address",
  // },
  {
    title: t("common:createdAt"),
    dataIndex: "createdAt",
    key: "createdAt",
    render: (date: string) => new Date(date).toLocaleDateString(),
  },
  {
    title: t("common:actions.actions"),
    key: "actions",
    render: (_, record) => {
      const isSuperAdmin = user.role === Role.SUPER_ADMIN;
      const isAdmin = user.role === Role.ADMIN;
      const isRecordAdmin = record.role === Role.ADMIN;
      const isRecordSuperAdmin = record.role === Role.SUPER_ADMIN;

      const canEdit =
        isSuperAdmin || (isAdmin && !isRecordAdmin && !isRecordSuperAdmin);
      const canDelete =
        isSuperAdmin || (isAdmin && !isRecordAdmin && !isRecordSuperAdmin);

      return (
        <Space size="middle" key={record._id}>
          <Button
            disabled={!canEdit}
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
          >
            {t("common:actions.edit")}
          </Button>
          <Popconfirm
            title={t("users:deleteUser.title")}
            description={t("users:deleteUser.description")}
            onConfirm={() => onDelete(record._id)}
            okText={t("common:actions.yes")}
            cancelText={t("common:actions.no")}
          >
            <Button disabled={!canDelete} danger icon={<DeleteOutlined />}>
              {t("common:actions.delete")}
            </Button>
          </Popconfirm>
        </Space>
      );
    },
  },
];
