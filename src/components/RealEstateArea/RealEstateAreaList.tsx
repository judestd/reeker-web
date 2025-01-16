import React from "react";
import { Table, Space, Button, Popconfirm, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { Area, RealEstateArea } from "../../types/realEstateArea";

interface RealEstateAreaListProps {
  areas: RealEstateArea[];
  loading?: boolean;
  onEdit: (area: RealEstateArea) => void;
  onDelete: (id: string) => void;
  pagination: any;
}

const RealEstateAreaList: React.FC<RealEstateAreaListProps> = ({
  areas,
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
      title: t("realEstateArea:name"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("realEstateArea:areas"),
      dataIndex: "area",
      key: "area",
      render: (areas: Area[]) => (
        <ul className="m-0 p-0">
          {areas.map((area: Area, index: number) => (
            <li key={index}>{showArea(area)}</li>
          ))}
        </ul>
      ),
    },
    {
      title: t("common:createdAt"),
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => dayjs(date).format("YYYY-MM-DD HH:mm"),
    },
    {
      title: t("common:actions.actions"),
      key: "actions",
      render: (_: any, record: RealEstateArea) => (
        <Space>
          <Tooltip title={t("common:actions.edit")}>
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => onEdit(record)}
              className="!p-0 !w-8 !h-8 !flex !items-center !justify-center hover:!bg-blue-50 !text-blue-600"
            />
          </Tooltip>
          <Popconfirm
            title={t("realEstateArea:deleteConfirm")}
            onConfirm={() => onDelete(record._id)}
            okText={t("common:actions.yes")}
            cancelText={t("common:actions.no")}
          >
            <Tooltip title={t("common:actions.delete")}>
              <Button
                type="text"
                icon={<DeleteOutlined />}
                className="!p-0 !w-8 !h-8 !flex !items-center !justify-center hover:!bg-red-50 !text-red-600"
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
      dataSource={areas}
      rowKey="_id"
      loading={loading}
      pagination={pagination}
    />
  );
};

export default RealEstateAreaList; 