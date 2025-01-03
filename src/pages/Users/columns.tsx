// src/pages/Users/columns.tsx
import { ColumnsType } from "antd/es/table";
import { Tag, Space, Button, Popconfirm } from "antd";
import { Name_Role, Role, User } from "../../types/user";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

interface ColumnProps {
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

export const columns = ({
  onEdit,
  onDelete,
}: ColumnProps): ColumnsType<User> => [
  {
    title: "Full Name",
    dataIndex: "fullName",
    key: "fullName",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
    render: (role: Role) => (
      <Tag color={role === "admin" ? "blue" : "green"}>{Name_Role[role]}</Tag>
    ),
  },
  {
    title: "Status",
    dataIndex: "isActive",
    key: "isActive",
    render: (isActive: boolean) => (
      <Tag color={isActive ? "success" : "error"}>
        {isActive ? "Active" : "Inactive"}
      </Tag>
    ),
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (date: string) => new Date(date).toLocaleDateString(),
  },
  {
    title: "Actions",
    key: "actions",
    render: (_, record) => (
      <Space size="middle">
        <Button icon={<EditOutlined />} onClick={() => onEdit(record)}>
          Edit
        </Button>
        <Popconfirm
          title="Delete user"
          description="Are you sure you want to delete this user?"
          onConfirm={() => onDelete(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger icon={<DeleteOutlined />}>
            Delete
          </Button>
        </Popconfirm>
      </Space>
    ),
  },
];
