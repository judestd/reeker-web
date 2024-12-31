import { User } from '../types/user';
import { generateId } from '../utils/helpers';

export const mockUsers: User[] = [
  {
    id: generateId(),
    name: 'John Doe',
    fullName: 'John Doe',
    email: 'john@example.com',
    role: 'ADMIN',
    gender: 'MALE',
    birthday: '1990-01-01',
    isActive: true,
    status: 'active',
    phone: '+1234567890',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    social: {
      facebook: 'john.doe',
      zalo: '123456789'
    }
  },
  {
    id: generateId(),
    name: 'Jane Smith',
    fullName: 'Jane Smith',
    email: 'jane@example.com',
    role: 'USER',
    gender: 'FEMALE',
    birthday: '1992-05-15',
    isActive: true,
    status: 'active',
    phone: '+1987654321',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane'
  },
  {
    id: generateId(),
    name: 'Bob Wilson',
    fullName: 'Bob Wilson',
    email: 'bob@example.com',
    role: 'USER',
    gender: 'MALE',
    isActive: false,
    status: 'inactive',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob'
  }
];