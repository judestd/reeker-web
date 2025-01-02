import React from "react";
import { Table, Button, Space, Tag } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Team } from "../../types/user";

interface TeamListProps {
  onEdit: (team: Team) => void;
  onView: (team: Team) => void;
}

const TeamList: React.FC<TeamListProps> = ({ onEdit, onView }) => {
  const { teams, loading } = useSelector((state: RootState) => state.teams);

  const columns = [
    {
      title: "Team Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Members",
      dataIndex: "members",
      key: "members",
      render: (members: string[]) => <Tag>{members.length} members</Tag>,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Team) => (
        <Space>
          <Button type="primary" onClick={() => onView(record)}>
            View
          </Button>
          <Button onClick={() => onEdit(record)}>Edit</Button>
        </Space>
      ),
    },
  ];

  return (
    <Table columns={columns} dataSource={teams} loading={loading} rowKey="id" />
  );
};

export default TeamList;
