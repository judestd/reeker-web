import { Role } from '../types/user';

export const ROLE_PERMISSIONS: Record<Role, string[]> = {
  admin: [
    'read:teams',
    'write:teams',
    'read:members',
    'write:members',
    'read:users',
    'write:users',
    'read:notifications',
    'write:notifications'
  ],
  owner: [
    'read:teams',
    'read:members',
    'read:notifications'
  ],
  super_admin: [
    'read:teams',
    'write:teams',
    'read:members',
    'write:members',
    'read:users',
    'write:users',
    'read:notifications',
    'write:notifications'
  ],
  owner_manager: [],
  customer: [],
  customer_manager: [],
  department_manager: []
};

export const hasPermission = (Role: Role, requiredPermission: string): boolean => {
  const permissions = ROLE_PERMISSIONS[Role] || [];
  return permissions.includes(requiredPermission);
};

export const checkRoutePermission = (Role: Role, route: string): boolean => {
  const routePermissionMap: Record<string, string> = {
    '/teams': 'read:teams',
    '/members': 'read:members',
    '/users': 'read:users',
    '/notifications': 'read:notifications'
  };

  const requiredPermission = routePermissionMap[route];
  if (!requiredPermission) return true; // Public route
  
  return hasPermission(Role, requiredPermission);
};