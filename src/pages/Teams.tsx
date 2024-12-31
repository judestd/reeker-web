import React, { useMemo } from 'react';
import { Space, message } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import TeamHeader from '../components/Teams/TeamHeader';
import TeamList from '../components/Teams/TeamList';
import TeamForm from '../components/Teams/TeamForm';
import TeamDetails from '../components/Teams/TeamDetails';
import AddMemberModal from '../components/Teams/AddMemberModal';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useTeamOperations } from '../hooks/useTeamOperations';
import useTeamMembers from '../hooks/useTeamMembers';
import { validateTeam } from '../utils/teamValidation';
import type { Team } from '../types/user';

const Teams: React.FC = () => {
  const { teams, loading } = useSelector((state: RootState) => state.teams);
  console.log(teams)
  const {
    selectedTeam,
    showAddMember,
    setSelectedTeam,
    setShowAddMember,
    handleCreateTeam,
    handleUpdateTeam,
    handleAddMembers,
    handleRemoveMember,
  } = useTeamOperations();

  const memberIds = useMemo(() => 
    selectedTeam?.members ?? [], 
    [selectedTeam?.members]
  );

  const { members, loading: membersLoading, error: membersError } = useTeamMembers(memberIds);

  const handleTeamSubmit = (values: Partial<Team>) => {
    const errors = validateTeam(values);
    if (errors.length) {
      errors.forEach(error => message.error(error));
      return;
    }
    
    if (selectedTeam) {
      handleUpdateTeam({ ...selectedTeam, ...values });
    } else {
      handleCreateTeam(values);
    }
  };

  const handleEdit = (team: Team) => setSelectedTeam(team);
  const handleView = (team: Team) => setSelectedTeam(team);

  if (membersError) {
    message.error(membersError);
  }

  const isLoading = loading || membersLoading;

  return (
    <LoadingSpinner spinning={isLoading}>
      <Space direction="vertical" size="large" style={{ width: '100%', display: 'flex' }}>
        <TeamHeader onCreateTeam={() => setSelectedTeam(null)} />

        {selectedTeam ? (
          <TeamDetails
            team={selectedTeam}
            members={members}
            onAddMembers={() => setShowAddMember(true)}
            onRemoveMember={handleRemoveMember}
          />
        ) : (
          <TeamForm 
            onSubmit={handleTeamSubmit}
            initialValues={selectedTeam}
          />
        )}

        <TeamList
          onEdit={handleEdit}
          onView={handleView}
        />

        <AddMemberModal
          visible={showAddMember}
          onCancel={() => setShowAddMember(false)}
          onAdd={handleAddMembers}
          currentMembers={selectedTeam?.members ?? []}
          loading={isLoading}
        />
      </Space>
    </LoadingSpinner>
  );
};

export default Teams;