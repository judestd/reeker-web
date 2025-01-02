import type { ColumnsType } from "antd/es/table";
import { Space, Tag, Button, Avatar, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined, UserOutlined } from "@ant-design/icons";
import type { User } from "../../../../types/user";
import { formatDate } from "../../../../utils/date";

interface UseUserColumnsProps {
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

export const useUserColumns = ({
  onEdit,
  onDelete,
}: UseUserColumnsProps): ColumnsType<User> => [
  {
    title: "Avatar",
    key: "avatar",
    width: 80,
    render: (_, user) => (
      <Avatar src={user.avatar} icon={<UserOutlined />} />
    ),
  },
  {
    title: "Full Name",
    dataIndex: "fullName",
    sorter: true,
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Role",
    dataIndex: "role",
    filters: [
      { text: "Admin", value: "ADMIN" },
      { text: "User", value: "USER" },
    ],
    render: (role) => (
      <Tag color={role === "ADMIN" ? "red" : "blue"}>{role}</Tag>
    ),
  },
  {
    title: "Status",
    dataIndex: "isActive",
    filters: [
      { text: "Active", value: true },
      { text: "Inactive", value: false },
    ],
    render: (isActive) => (
      <Tag color={isActive ? "success" : "error"}>
        {isActive ? "Active" : "Inactive"}
      </Tag>
    ),
  },
  {
    title: "Birthday",
    dataIndex: "birthday",
    render: (date) => formatDate(date),
  },
  {
    title: "Actions",
    key: "actions",
    render: (_, user) => (
      <Space>
        <Button icon={<EditOutlined />} onClick={() => onEdit(user)}>
          Edit
        </Button>
        <Popconfirm
          title="Delete user"
          description="Are you sure you want to delete this user?"
          onConfirm={() => onDelete(user)}
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
