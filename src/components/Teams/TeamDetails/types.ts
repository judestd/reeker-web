import type { Team, User } from "../../../types/user";

export interface TeamDetailsProps {
  team?: Team;
  members: User[];
  loading?: boolean;
  onAddMembers: () => void;
  onRemoveMember: (userId: string) => void;
}
