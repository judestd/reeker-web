import type { User, Team } from '../types/user';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    fullName: 'Admin User',
    email: 'admin@example.com',
    role: 'ADMIN',
    teams: ['1'],
    joinDate: '2023-01-01',
    isTemporaryLeave: false,
    status: 'active',
    isActive: true
  },
  {
    id: '2',
    name: 'Regular User',
    fullName: 'Regular User',
    email: 'user@example.com',
    role: 'USER',
    teams: ['1'],
    joinDate: '2023-02-01',
    isTemporaryLeave: false,
    status: 'active',
    isActive: true
  }
];

export const mockTeams: Team[] = [
  {
    id: '1',
    name: 'Development Team',
    members: ['1', '2'],
    createdAt: '2023-01-01'
  }
];