import { User } from "../../../types/user";

export interface MemberListProps {
  members: User[];
  loading?: boolean;
  onEdit: (user: User) => void;
}
