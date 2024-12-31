// src/hooks/useUsers.ts
import { useState, useEffect } from 'react';
import { notification } from 'antd';
import { userApi } from '../api/endpoints/user';
import type { User, CreateUserInput } from '../types/user';
import { PaginationMetadata } from '../types/common';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<PaginationMetadata | null>(null);

  const fetchUsers = async (page = 1, limit = 10) => {
    setLoading(true);
    try {
      const response = await userApi.getUsers({ page, limit });
      setUsers(response.data.data);
      setPagination(response.data.metadata.pagination);
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to fetch users'
      });
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (data: CreateUserInput) => {
    setLoading(true);
    try {
      await userApi.createUser(data);
      notification.success({
        message: 'Success',
        description: 'User created successfully'
      });
      fetchUsers(); // Refresh list
      return true;
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to create user'
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Load users on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    pagination,
    fetchUsers,
    createUser
  };
};
