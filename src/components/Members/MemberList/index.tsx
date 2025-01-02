import React from "react";
import { Table } from "antd";
import type { User } from "../../../types/user";
import type { MemberListProps } from "./types";
import { useMemberListConfig } from "./hooks";

const MemberList: React.FC<MemberListProps> = ({
  members,
  loading,
  onEdit,
}) => {
  const { columns, tableConfig } = useMemberListConfig(onEdit);

  return (
    <div className="overflow-hidden rounded-lg shadow">
      <Table<User>
        {...tableConfig}
        columns={columns}
        dataSource={members}
        loading={loading}
        rowKey="id"
        className="bg-white"
      />
    </div>
  );
};

export default MemberList;
