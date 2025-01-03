import { ColumnsType } from "antd/es/table";
import { Tag, Space, Button, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Name_Role, Role, User } from "../../types/user";
import { TFunction } from "i18next";

interface ColumnProps {
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
  t: TFunction;
}

export const columns = ({
  onEdit,
  onDelete,
  t,
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
      <Tag color={role === "admin" ? "blue" : "green"}>{Name_Role[role]}</Tag>
    ),
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
    render: (gender: string) =>
      gender ? gender.charAt(0).toUpperCase() + gender.slice(1) : "",
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
    render: (_, record) => (
      <Space size="middle">
        <Button icon={<EditOutlined />} onClick={() => onEdit(record)}>
          {t("common:actions.edit")}
        </Button>
        <Popconfirm
          title={t("users:deleteUser.title")}
          description={t("users:deleteUser.description")}
          onConfirm={() => onDelete(record.id)}
          okText={t("common:actions.yes")}
          cancelText={t("common:actions.no")}
        >
          <Button danger icon={<DeleteOutlined />}>
            {t("common:actions.delete")}
          </Button>
        </Popconfirm>
      </Space>
    ),
  },
];
