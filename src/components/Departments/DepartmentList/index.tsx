import React from "react";
import { Table, Space, Button, Popconfirm, Tag, Typography, Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { Department } from "../../../types/department";
import {
  BlockRounded,
  CheckCircleRounded,
  EditOutlined,
  PowerSettingsNewRounded
} from '@mui/icons-material';
import type { AlignType } from 'rc-table/lib/interface';
import styles from '../../../styles/common.module.css';

const { Text, Paragraph } = Typography;

interface DepartmentListProps {
  departments: Department[];
  loading?: boolean;
  onEdit: (department: Department) => void;
  onStatusChange: (id: string, isActive: boolean) => void;
  pagination: any;
}

const DepartmentList: React.FC<DepartmentListProps> = ({
  departments,
  loading,
  onEdit,
  onStatusChange,
  pagination,
}) => {
  const { t } = useTranslation();

  const columns = [
    {
      title: t("departments:name"),
      dataIndex: "name",
      key: "name",
      width: 200,
      sorter: (a: Department, b: Department) => a.name.localeCompare(b.name),
      render: (name: string) => (
        <Text strong className="text-gray-800">
          {name}
        </Text>
      ),
    },
    {
      title: t("departments:owner"),
      dataIndex: "owner",
      key: "owner",
      width: 150,
      render: (owner: Department["owner"]) => (
        <Text className="text-gray-600">
          {owner?.fullName || "-"}
        </Text>
      ),
    },
    {
      title: t("departments:foundationDate"),
      dataIndex: "foundationDate",
      key: "foundationDate",
      width: 150,
      render: (date: string) => (
        <Text className="text-gray-600">
          {date ? dayjs(date).format("DD/MM/YYYY") : "-"}
        </Text>
      ),
    },
    {
      title: t("departments:description"),
      dataIndex: "description",
      key: "description",
      width: '25%',
      render: (description: string) => (
        <Paragraph ellipsis={{ rows: 2 }} className="mb-0 text-gray-600">
          {description || "-"}
        </Paragraph>
      ),
    },
    {
      title: t("departments:status"),
      dataIndex: "isActive",
      key: "isActive",
      width: 150,
      align: 'center' as AlignType,
      render: (isActive: boolean) => (
        <Tag
          color={isActive ? "success" : "error"}
          className="min-w-[90px] !px-2 !py-0.5 rounded-full text-xs font-medium"
        >
          <span className="flex items-center justify-center gap-1">
            {isActive ? (
              <CheckCircleRounded sx={{ fontSize: 14 }} />
            ) : (
              <BlockRounded sx={{ fontSize: 14 }} />
            )}
            {isActive ? t("common:status.active") : t("common:status.inactive")}
          </span>
        </Tag>
      ),
    },
    {
      title: t("common:actions.actions"),
      key: "actions",
      width: 100,
      fixed: 'right' as const,
      align: 'center' as AlignType,
      render: (_: any, record: Department) => (
        <Space>
          <Tooltip title={t("common:actions.edit")}>
            <Button
              type="text"
              icon={<EditOutlined className={styles.tableIcon} />}
              onClick={() => onEdit(record)}
              className="!p-0 !w-8 !h-8 !flex !items-center !justify-center hover:!bg-blue-50 !text-blue-600"
            />
          </Tooltip>
          <Popconfirm
            title={t("departments:statusChangeConfirm")}
            onConfirm={() => onStatusChange(record._id, !record.isActive)}
            okText={t("common:actions.yes")}
            cancelText={t("common:actions.no")}
          >
            <Tooltip 
              title={record.isActive ? t("common:actions.deactivate") : t("common:actions.activate")}
            >
              <Button
                type="text"
                icon={
                  <PowerSettingsNewRounded 
                    className={`${styles.tableIcon} ${record.isActive ? '!text-red-600' : '!text-green-600'}`}
                  />
                }
                className={`!p-0 !w-8 !h-8 !flex !items-center !justify-center ${
                  record.isActive 
                    ? 'hover:!bg-red-50 !text-red-600' 
                    : 'hover:!bg-green-50 !text-green-600'
                }`}
              />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={departments}
      rowKey="_id"
      loading={loading}
      pagination={pagination}
      className="bg-white rounded-lg shadow-sm"
      rowClassName="hover:bg-gray-50"
      scroll={{ x: 1000 }}
    />
  );
};

export default DepartmentList;
