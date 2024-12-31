import { useMemo } from 'react';
import type { TableProps } from 'antd';
import type { User } from '../../../types/user';
import { getMemberColumns } from './columns';

export const useMemberListConfig = (onEdit: (user: User) => void) => {
  const columns = useMemo(() => getMemberColumns(onEdit), [onEdit]);

  const tableConfig: Partial<TableProps<User>> = {
    pagination: {
      defaultPageSize: 10,
      showSizeChanger: true,
      showTotal: (total) => `Total ${total} members`,
      className: 'px-6 py-4',
    },
  };

  return { columns, tableConfig };
};