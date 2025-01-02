import React from "react";
import { Space, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

interface TeamHeaderProps {
  onCreateTeam: () => void;
}

const TeamHeader: React.FC<TeamHeaderProps> = ({ onCreateTeam }) => (
  <Space>
    <Button type="primary" icon={<PlusOutlined />} onClick={onCreateTeam}>
      Create Team
    </Button>
  </Space>
);

export default TeamHeader;
