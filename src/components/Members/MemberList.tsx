import React from "react";
import { Table, Tag, Space, Button } from "antd";
import { User } from "../../types/user";

interface MemberListProps {
  members: User[];
  loading?: boolean;
  onEdit: (user: User) => void;
}

const MemberList: React.FC<MemberListProps> = ({
  members,
  loading,
  onEdit,
}) => {
  const columns: any[] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a: User, b: User) => a.fullName.localeCompare(b.fullName),
      className: "text-gray-900 font-medium",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string) => (
        <Tag color={role === "ADMIN" ? "red" : "blue"} className="rounded-full">
          {role}
        </Tag>
      ),
      filters: [
        { text: "Admin", value: "ADMIN" },
        { text: "User", value: "USER" },
      ],
      onFilter: (value: string, record: User) => record.role === value,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag
          color={status === "active" ? "green" : "orange"}
          className="rounded-full"
        >
          {status}
        </Tag>
      ),
      filters: [
        { text: "Active", value: true },
        { text: "Inactive", value: false },
      ],
      onFilter: (value: string, record: User) =>
        record.isActive === (value === "true"),
    },
    {
      title: "Join Date",
      dataIndex: "joinDate",
      key: "joinDate",
      sorter: (a: User, b: User) => {
        if (!a.joinedDepartmentAt || !b.joinedDepartmentAt) return 0;
        return (
          new Date(a.joinedDepartmentAt).getTime() -
          new Date(b.joinedDepartmentAt).getTime()
        );
      },
      className: "text-gray-600",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: User) => (
        <Space>
          <Button
            type="primary"
            onClick={() => onEdit(record)}
            className="hover:opacity-90"
          >
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="overflow-hidden rounded-lg shadow">
      <Table
        columns={columns}
        dataSource={members}
        loading={loading}
        rowKey="id"
        className="bg-white"
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} members`,
          className: "px-6 py-4",
        }}
      />
    </div>
  );
};

export default MemberList;
