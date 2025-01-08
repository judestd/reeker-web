import React from "react";
import { Table, Space, Button, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { RealEstateType } from "../../types/realEstateType";

interface RealEstateTypeListProps {
  realEstateTypes: RealEstateType[];
  loading?: boolean;
  onEdit: (realEstateType: RealEstateType) => void;
  onDelete: (id: string) => void;
  pagination: any;
}

const RealEstateTypeList: React.FC<RealEstateTypeListProps> = ({
  realEstateTypes,
  loading,
  onEdit,
  onDelete,
  pagination,
}) => {
  const { t } = useTranslation();

  const columns = [
    {
    //   title: t("realEstateType:number"),
      key: "index",
      render: (_: any, __: RealEstateType, index: number) => index + 1,
    },
    {
      title: t("realEstateType:name"),
      dataIndex: "name",
      key: "name",
      sorter: (a: RealEstateType, b: RealEstateType) => 
        a.name.localeCompare(b.name),
    },
    {
      title: t("common:createdAt"),
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => dayjs(date).format("YYYY-MM-DD HH:mm"),
    },
    {
      title: t("common:updatedAt"),
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (date: string) => dayjs(date).format("YYYY-MM-DD HH:mm"),
    },
    {
      title: t("common:actions.actions"),
      key: "actions",
      render: (_: any, record: RealEstateType) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
          >
            {t("common:actions.edit")}
          </Button>
          <Popconfirm
            title={t("realEstateType:deleteConfirm")}
            onConfirm={() => onDelete(record._id)}
            okText={t("common:actions.yes")}
            cancelText={t("common:actions.no")}
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
      dataSource={realEstateTypes}
      rowKey="_id"
      loading={loading}
      pagination={pagination}
    />
  );
};

export default RealEstateTypeList; 