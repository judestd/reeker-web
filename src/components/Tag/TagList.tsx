import React from "react";
import { Table, Space, Tooltip, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { Tag } from "../../types/tag";

interface TagListProps {
  tags: Tag[];
  loading?: boolean;
  onEdit: (tag: Tag) => void;
  onDelete: (id: string) => void;
  pagination: any;
}

const TagList: React.FC<TagListProps> = ({
  tags,
  loading,
  onEdit,
  onDelete,
  pagination,
}) => {
  const { t } = useTranslation();

  const columns = [
    {
      dataIndex: "index",
      key: "index",
      render: (_: any, __: Tag, index: number) => index + 1,
    },
    {
      title: t("tags:name"),
      dataIndex: "name",
      key: "name",
      sorter: (a: Tag, b: Tag) => a.name.localeCompare(b.name),
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
      width: 120,
      render: (_: any, record: Tag) => (
        <Space size="middle">
          <Tooltip title={t("common:actions.edit")}>
            <EditOutlined
              className="text-blue-600 cursor-pointer text-lg"
              onClick={() => onEdit(record)}
            />
          </Tooltip>
          <Popconfirm
            title={t("tags:deleteConfirm")}
            onConfirm={() => onDelete(record._id)}
            okText={t("common:actions.yes")}
            cancelText={t("common:actions.no")}
          >
            <Tooltip title={t("common:actions.delete")}>
              <DeleteOutlined className="text-red-600 cursor-pointer text-lg" />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={tags}
      rowKey="_id"
      loading={loading}
      pagination={pagination}
    />
  );
};

export default TagList; 