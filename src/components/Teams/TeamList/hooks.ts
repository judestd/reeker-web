import { useMemo } from "react";
import type { TableProps } from "antd";
import type { Team } from "../../../types/user";
import { getTeamColumns } from "./columns";

export const useTeamListConfig = (
  onEdit: (team: Team) => void,
  onView: (team: Team) => void,
) => {
  const columns = useMemo(
    () => getTeamColumns(onEdit, onView),
    [onEdit, onView],
  );

  const tableConfig: Partial<TableProps<Team>> = {
    pagination: {
      defaultPageSize: 10,
      showSizeChanger: true,
      showTotal: (total) => `Total ${total} teams`,
      className: "px-6 py-4",
    },
  };

  return { columns, tableConfig };
};
