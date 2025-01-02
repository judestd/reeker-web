import React from "react";
import { Space, Button } from "antd";
import type { TeamDetailsProps } from "./types";
import TeamStats from "../TeamStats";
import TeamMembers from "../TeamMembers";

const TeamDetails: React.FC<TeamDetailsProps> = ({
  members,
  loading,
  onAddMembers,
  onRemoveMember,
}) => (
  <Space direction="vertical" size="large" style={{ width: "100%" }}>
    <TeamStats members={members} />
    <TeamMembers
      members={members}
      onRemoveMember={onRemoveMember}
      loading={loading}
    />
    <Button type="primary" onClick={onAddMembers}>
      Add Members
    </Button>
  </Space>
);

export default TeamDetails;
