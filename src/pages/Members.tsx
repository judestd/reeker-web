import React, { useState } from 'react';
import { Card } from 'antd';
import MemberList from '../components/Members/MemberList';
import EditMemberModal from '../components/Members/EditMemberModal';
import { User } from '../types/user';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useMembers } from '../hooks/useMembers';
import PageHeader from '../components/common/PageHeader';

const Members: React.FC = () => {
  const [editingMember, setEditingMember] = useState<User | null>(null);
  const { members, loading, updateMember } = useMembers();

  const handleSaveMember = (values: Partial<User>) => {
    if (editingMember) {
      updateMember(editingMember.id, values);
      setEditingMember(null);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Team Members"
        subtitle="Manage your team members"
      />
      
      <LoadingSpinner spinning={loading}>
        <Card className="shadow-md">
          <MemberList 
            members={members}
            loading={loading}
            onEdit={setEditingMember}
          />
        </Card>

        <EditMemberModal
          visible={!!editingMember}
          member={editingMember}
          onCancel={() => setEditingMember(null)}
          onSave={handleSaveMember}
          loading={loading}
        />
      </LoadingSpinner>
    </div>
  );
};

export default Members;