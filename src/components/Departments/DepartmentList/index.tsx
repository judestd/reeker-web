import React from "react";
import { Table, Space, Button, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";

interface DepartmentListProps {
  departments: any[];
  onEdit: (department: any) => void;
  onDelete: (id: string) => void;
}

const DepartmentList: React.FC<DepartmentListProps> = ({
  departments,
  onEdit,
  onDelete,
}) => {
  const { t } = useTranslation();

  const columns = [
    {
      title: t("departments:name"),
      dataIndex: "name",
      key: "name",
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
    },
    {
      title: t("departments:foundationDate"),
      dataIndex: "foundation_date",
      key: "foundation_date",
      render: (date: string) => dayjs(date).format("YYYY-MM-DD"),
      sorter: (a: any, b: any) =>
        new Date(a.foundation_date).getTime() -
        new Date(b.foundation_date).getTime(),
    },
    {
      title: t("common:actions.actions"),
      key: "actions",
      render: (_: any, record: any) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
          >
            {t("common:actions.edit")}
          </Button>
          <Popconfirm
            title={t("departments:deleteConfirm")}
            onConfirm={() => onDelete(record._id)}
            okText={t("common:actions.delete")}
            cancelText={t("common:actions.cancel")}
          >
            <Button danger icon={<DeleteOutlined />}>
              {t("common:actions.delete")}
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
      pagination={{
        defaultPageSize: 10,
        // showSizeChanger: true,
        // showTotal: (total) => t("departments:total", { total }),
      }}
    />
  );
};

export default DepartmentList;
