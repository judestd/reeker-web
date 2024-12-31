import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import PageHeader from '../components/common/PageHeader';
import DashboardStats from '../components/Dashboard/DashboardStats';

const Dashboard: React.FC = () => {
  const { teams } = useSelector((state: RootState) => state.teams);
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user) return null;

  return (
    <div>
      <PageHeader 
        title={`Welcome, ${user.fullName}!`}
        subtitle="Here's your dashboard overview"
      />
      <DashboardStats teams={teams} user={user} />
    </div>
  );
};

export default Dashboard;