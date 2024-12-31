import { UserRole } from '../types/user';

export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
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
  USER: [
    'read:teams',
    'read:members',
    'read:notifications'
  ]
};

export const hasPermission = (userRole: UserRole, requiredPermission: string): boolean => {
  const permissions = ROLE_PERMISSIONS[userRole] || [];
  return permissions.includes(requiredPermission);
};

export const checkRoutePermission = (userRole: UserRole, route: string): boolean => {
  const routePermissionMap: Record<string, string> = {
    '/teams': 'read:teams',
    '/members': 'read:members',
    '/users': 'read:users',
    '/notifications': 'read:notifications'
  };

  const requiredPermission = routePermissionMap[route];
  if (!requiredPermission) return true; // Public route
  
  return hasPermission(userRole, requiredPermission);
};