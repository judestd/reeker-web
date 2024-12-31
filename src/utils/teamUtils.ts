import { Team, User } from '../types/user';

export const createNewTeam = (values: Partial<Team>): Team => ({
  ...values,
  id: Date.now().toString(),
  members: [],
  createdAt: new Date().toISOString(),
} as Team);

export const addMembersToTeam = (team: Team, newMemberIds: string[]): Team => ({
  ...team,
  members: [...team.members, ...newMemberIds],
});

export const removeMemberFromTeam = (team: Team, userId: string): Team => ({
  ...team,
  members: team.members.filter(id => id !== userId),
});

export const getMemberStats = (members: User[]) => ({
  total: members.length,
  active: members.filter(m => m.status === 'active').length,
  inactive: members.filter(m => m.status === 'inactive').length,
  onLeave: members.filter(m => m.isTemporaryLeave).length,
});