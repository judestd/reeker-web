import type { Team } from '../../../types/user';

export interface TeamFormProps {
  initialValues?: Partial<Team> | null;
  onSubmit: (values: Partial<Team>) => void;
  loading?: boolean;
}