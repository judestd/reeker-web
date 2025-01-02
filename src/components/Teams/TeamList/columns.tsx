import { ColumnsType } from "antd/es/table";
import { Space, Button, Tag } from "antd";
import type { Team } from "../../../types/user";

export const getTeamColumns = (
  onEdit: (team: Team) => void,
  onView: (team: Team) => void,
): ColumnsType<Team> => [
  {
    title: "Team Name",
    dataIndex: "name",
    key: "name",
    sorter: (a, b) => a.name.localeCompare(b.name),
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
    render: (_: unknown, record: Team) => (
      <Space>
        <Button type="primary" onClick={() => onView(record)}>
          View
        </Button>
        <Button onClick={() => onEdit(record)}>Edit</Button>
      </Space>
    ),
  },
];
