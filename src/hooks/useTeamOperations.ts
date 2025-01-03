import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { notification } from "antd";
import { Team } from "../types/user";
import { addTeam, updateTeam } from "../store/slices/teamSlice";
import {
  createNewTeam,
  addMembersToTeam,
  removeMemberFromTeam,
} from "../utils/teamUtils";

export const useTeamOperations = () => {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [showAddMember, setShowAddMember] = useState(false);
  const dispatch = useDispatch();

  const handleCreateTeam = useCallback(
    (values: Partial<Team>) => {
      try {
        const newTeam = createNewTeam(values);
        dispatch(addTeam(newTeam));
        notification.success({
          message: "Team Created",
          description: "The team has been created successfully.",
        });
      } catch (error) {
        notification.error({
          message: "Error",
          description: "Failed to create team.",
        });
      }
    },
    [dispatch],
  );

  const handleUpdateTeam = useCallback(
    (values: Team) => {
      try {
        dispatch(updateTeam(values));
        setSelectedTeam(values);
        notification.success({
          message: "Team Updated",
          description: "The team has been updated successfully.",
        });
      } catch (error) {
        notification.error({
          message: "Error",
          description: "Failed to update team.",
        });
      }
    },
    [dispatch],
  );

  const handleAddMembers = useCallback(
    (userIds: string[]) => {
      if (selectedTeam) {
        try {
          const updatedTeam = addMembersToTeam(selectedTeam, userIds);
          dispatch(updateTeam(updatedTeam));
          setSelectedTeam(updatedTeam);
          setShowAddMember(false);
          notification.success({
            message: "Members Added",
            description: "Team members have been added successfully.",
          });
        } catch (error) {
          notification.error({
            message: "Error",
            description: "Failed to add members.",
          });
        }
      }
    },
    [selectedTeam, dispatch],
  );

  const handleRemoveMember = useCallback(
    (userId: string) => {
      if (selectedTeam) {
        try {
          const updatedTeam = removeMemberFromTeam(selectedTeam, userId);
          dispatch(updateTeam(updatedTeam));
          setSelectedTeam(updatedTeam);
          notification.success({
            message: "Member Removed",
            description: "Team member has been removed successfully.",
          });
        } catch (error) {
          notification.error({
            message: "Error",
            description: "Failed to remove member.",
          });
        }
      }
    },
    [selectedTeam, dispatch],
  );

  return {
    selectedTeam,
    showAddMember,
    setSelectedTeam,
    setShowAddMember,
    handleCreateTeam,
    handleUpdateTeam,
    handleAddMembers,
    handleRemoveMember,
  };
};

export default useTeamOperations;
