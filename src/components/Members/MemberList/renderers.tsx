import type { UserRole, UserStatus } from '../../../types/user';
import { Tag } from 'antd';

export const renderRole = (role: UserRole) => (
  <Tag color={role === 'ADMIN' ? 'red' : 'blue'} className="rounded-full">
    {role}
  </Tag>
);

export const renderStatus = (status: UserStatus) => (
  <Tag 
    color={status === 'active' ? 'green' : 'orange'}
    className="rounded-full"
  >
    {status}
  </Tag>
);