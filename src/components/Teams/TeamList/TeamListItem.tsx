import React from "react";
import { Button, Space, Tag, Typography } from "antd";
import { Team } from "../../../types/user";

const { Text } = Typography;

interface TeamListItemProps {
  team: Team;
  onEdit: (team: Team) => void;
  onView: (team: Team) => void;
}

const TeamListItem: React.FC<TeamListItemProps> = ({
  team,
  onEdit,
  onView,
}) => (
  <div className="flex justify-between items-center py-4 px-2 hover:bg-gray-50 transition-colors">
    <div className="flex items-center space-x-3">
      <Text strong className="text-gray-900">
        {team.name}
      </Text>
      <Tag color="blue" className="rounded-full">
        {team.members.length} members
      </Tag>
    </div>
    <Space>
      <Button
        type="primary"
        onClick={() => onView(team)}
        className="hover:opacity-90"
      >
        View
      </Button>
      <Button onClick={() => onEdit(team)} className="hover:bg-gray-100">
        Edit
      </Button>
    </Space>
  </div>
);

export default TeamListItem;
