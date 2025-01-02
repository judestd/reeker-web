import React from "react";
import { Table } from "antd";
import type { Team } from "../../../types/user";
import type { TeamListProps } from "./types";
import { useTeamListConfig } from "./hooks";

const TeamList: React.FC<TeamListProps> = ({
  teams,
  loading,
  onEdit,
  onView,
}) => {
  const { columns, tableConfig } = useTeamListConfig(onEdit, onView);

  return (
    <div className="overflow-hidden rounded-lg shadow">
      <Table<Team>
        {...tableConfig}
        columns={columns}
        dataSource={teams}
        loading={loading}
        rowKey="id"
        className="bg-white"
      />
    </div>
  );
};

export default TeamList;
