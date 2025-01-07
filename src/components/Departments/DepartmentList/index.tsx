import React from "react";
import { Table, Space, Button, Popconfirm, Tag } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { Department } from "../../../types/department";

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
      sorter: (a: Department, b: Department) => a.name.localeCompare(b.name),
    },
    {
      title: t("departments:owner"),
      dataIndex: "owner",
      key: "owner",
      render: (owner: Department["owner"]) => owner?.fullName || "-",
    },
    {
      title: t("departments:foundationDate"),
      dataIndex: "foundationDate",
      key: "foundationDate",
      render: (date: string) => (date ? dayjs(date).format("YYYY-MM-DD") : "-"),
    },
    {
      title: t("departments:description"),
      dataIndex: "description",
      key: "description",
      render: (description: string) => description || "-",
    },
    {
      title: t("departments:status"),
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive: boolean) => (
        <Tag color={isActive ? "success" : "error"}>
          {isActive ? t("common:status.active") : t("common:status.inactive")}
        </Tag>
      ),
    },
    {
      title: t("common:actions.actions"),
      key: "actions",
      render: (_: any, record: Department) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
          >
            {t("common:actions.edit")}
          </Button>
          <Popconfirm
            title={t("departments:statusChangeConfirm")}
            onConfirm={() => onStatusChange(record._id, !record.isActive)}
            okText={t("common:actions.yes")}
            cancelText={t("common:actions.no")}
          >
            <Button
              variant="solid"
              color={record.isActive ? "danger" : "primary"}
            >
              {record.isActive
                ? t("common:actions.deactivate")
                : t("common:actions.activate")}
            </Button>
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
    />
  );
};

export default DepartmentList;
