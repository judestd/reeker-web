import type { Team } from '../../../types/user';

export interface TeamListProps {
  teams: Team[];
  loading?: boolean;
  onEdit: (team: Team) => void;
  onView: (team: Team) => void;
}