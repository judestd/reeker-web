import { User } from '../types/user';
import { generateId } from '../utils/helpers';

export const mockAdmin: User = {
  id: generateId(),
  name: 'Admin User',
  fullName: 'Admin User',
  email: 'admin@example.com',
  role: 'ADMIN',
  isActive: true,
  status: 'active',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin'
};

export const mockAuthService = {
  login: (email: string, _password: string): Promise<{ user: User; token: string }> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // For demo, only allow admin@example.com with any password
        if (email === 'admin@example.com') {
          resolve({
            user: mockAdmin,
            token: 'mock-jwt-token'
          });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 500); // Simulate network delay
    });
  }
};