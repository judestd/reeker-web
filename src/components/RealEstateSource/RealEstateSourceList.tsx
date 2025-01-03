import React from "react";
import { Table, Space, Button, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import type { Area, RealEstateSource } from "../../types/realEstateSource";
import dayjs from "dayjs";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

interface RealEstateSourceListProps {
  sources: RealEstateSource[];
  loading?: boolean;
  onEdit: (source: RealEstateSource) => void;
  onDelete: (id: string) => void;
  pagination: any;
}

const RealEstateSourceList: React.FC<RealEstateSourceListProps> = ({
  sources,
  loading,
  onEdit,
  onDelete,
  pagination,
}) => {
  const { t } = useTranslation();
  const { provinces, districts, wards } = useSelector(
    (state: RootState) => state.location,
  );

  const showArea = (area: Area) => {
    const province = provinces.find((p) => p.code === area.province_code);
    const district = districts.find((d) => d.code === area.district_code);
    const ward = wards.find((w) => w.code === area.ward_code);

    return [ward?.fullName, district?.fullName, province?.fullName]
      .filter((value) => value)
      .join(" - ");
  };

  const columns = [
    {
      title: t("realEstateSource:name"),
      dataIndex: "name",
      key: "name",
      //   sorter: true,
    },
    {
      title: t("realEstateSource:areas"),
      dataIndex: "area",
      key: "area",
      render: (areas: RealEstateSource["area"]) => (
        <ul className="m-0 p-0">
          {areas.map((area) => (
            <li>{showArea(area)}</li>
          ))}
        </ul>
      ),
    },
    {
      title: t("common:createdAt"),
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => dayjs(date).format("YYYY-MM-DD HH:mm"),
      //   sorter: true,
    },
    {
      title: t("common:actions.actions"),
      key: "actions",
      render: (_: any, record: RealEstateSource) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
          >
            {t("common:actions.edit")}
          </Button>
          <Popconfirm
            title={t("realEstateSource:deleteConfirm")}
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
      dataSource={sources}
      rowKey="_id"
      loading={loading}
      pagination={pagination}
    />
  );
};

export default RealEstateSourceList;
