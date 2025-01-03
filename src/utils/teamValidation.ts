import { Team } from "../types/user";

export const validateTeamName = (name: string): string | null => {
  if (!name) {
    return "Team name is required";
  }
  if (name.length < 3) {
    return "Team name must be at least 3 characters";
  }
  if (name.length > 50) {
    return "Team name must not exceed 50 characters";
  }
  return null;
};

export const validateTeamMembers = (members: string[]): string | null => {
  if (!members.length) {
    return "Team must have at least one member";
  }
  if (members.length > 50) {
    return "Team cannot have more than 50 members";
  }
  return null;
};

export const validateTeam = (team: Partial<Team>): string[] => {
  const errors: string[] = [];

  const nameError = validateTeamName(team.name || "");
  if (nameError) errors.push(nameError);

  if (team.members) {
    const membersError = validateTeamMembers(team.members);
    if (membersError) errors.push(membersError);
  }

  return errors;
};
