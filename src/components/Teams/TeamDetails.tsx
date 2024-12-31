import React from 'react';
import { Space, Button } from 'antd';
import { Team, User } from '../../types/user';
import TeamStats from './TeamStats';
import TeamMembers from './TeamMembers';

interface TeamDetailsProps {
  team: Team;
  members: User[];
  loading?: boolean;
  onAddMembers: () => void;
  onRemoveMember: (userId: string) => void;
}

const TeamDetails: React.FC<TeamDetailsProps> = ({
  members,
  loading,
  onAddMembers,
  onRemoveMember,
}) => (
  <Space direction="vertical" size="large" style={{ width: '100%' }}>
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