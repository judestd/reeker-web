// src/hooks/useUsers.ts
import { useState, useEffect } from "react";
import { notification } from "antd";
import { userApi } from "../api/endpoints/user";
import type { User, CreateUserInput, UpdateUserInput } from "../types/user";
import { PaginationMetadata } from "../types/common";
import { useTranslation } from "react-i18next";

export const useUsers = () => {
  const { t } = useTranslation();
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
        message: "Error",
        description: "Failed to fetch users",
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
        message: t("users:messages.createSuccess"),
      });
      fetchUsers(); // Refresh list
      return true;
    } catch (error) {
      notification.error({
        message: t("users:messages.error.create"),
        description: t("users:messages.error.create"),
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (id: string, data: UpdateUserInput) => {
    setLoading(true);
    try {
      await userApi.updateUser(id, data);
      notification.success({
        message: t("users:messages.updateSuccess"),
      });
      fetchUsers(); // Refresh list
      return true;
    } catch (error) {
      notification.error({
        message: t("users:messages.error.update"),
        description: t("users:messages.error.update"),
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id: string) => {
    setLoading(true);
    try {
      await userApi.deleteUser(id);
      notification.success({
        message: t("users:messages.deleteSuccess"),
      });
      fetchUsers(); // Refresh list
      return true;
    } catch (error) {
      notification.error({
        message: t("users:messages.error.delete"),
        description: t("users:messages.error.delete"),
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
    createUser,
    updateUser,
    deleteUser,
  };
};
