import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd";
import { RootState } from "../store";
import { updateMember as updateMemberAction } from "../store/slices/memberSlice";
import { User } from "../types/user";

export const useMembers = () => {
  const dispatch = useDispatch();
  const { members, loading } = useSelector((state: RootState) => state.members);
  const [error, setError] = useState<string | null>(null);

  const updateMember = useCallback(
    (id: string, updates: Partial<User>) => {
      try {
        dispatch(updateMemberAction({ id, updates }));
        notification.success({
          message: "Member Updated",
          description: "Member information has been updated successfully.",
        });
      } catch (error) {
        setError("Failed to update member");
        notification.error({
          message: "Error",
          description: "Failed to update member information.",
        });
      }
    },
    [dispatch],
  );

  return {
    members,
    loading,
    error,
    updateMember,
  };
};

export default useMembers;
