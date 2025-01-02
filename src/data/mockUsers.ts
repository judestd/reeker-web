import { User, Role } from '../types/user';
import { generateId } from '../utils/helpers';

export const mockUsers: User[] = [
  {
    id: generateId(),
    fullName: 'John Doe',
    email: 'john@example.com',
    role: Role.ADMIN,
    gender: 'MALE',
    birthday: '1990-01-01',
    isActive: true,
    phone: '+1234567890',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    social: {
      facebook: 'john.doe',
      zalo: '123456789'
    },
    isAdmin: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: generateId(),
    fullName: 'Jane Smith',
    email: 'jane@example.com',
    role: Role.CUSTOMER,
    gender: 'FEMALE',
    birthday: '1992-05-15',
    isActive: true,
    phone: '+1987654321',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
    isAdmin: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: generateId(),
    fullName: 'Bob Wilson',
    email: 'bob@example.com',
    role: Role.CUSTOMER_MANAGER,
    gender: 'MALE',
    isActive: false,
    birthday: '1988-08-08',
    phone: '+1122334455',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
    isAdmin: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];