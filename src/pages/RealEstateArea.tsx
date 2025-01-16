import React, { useState, useEffect } from "react";
import { Card, Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { RealEstateArea } from "../types/realEstateArea";
import { realEstateAreaApi } from "../api/endpoints/realEstateArea";
import RealEstateAreaList from "../components/RealEstateArea/RealEstateAreaList";
import EditRealEstateAreaModal from "../components/RealEstateArea/EditRealEstateAreaModal";

const RealEstateAreas: React.FC = () => {
  const { t } = useTranslation();
  const [areas, setAreas] = useState<RealEstateArea[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingArea, setEditingArea] = useState<RealEstateArea | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchAreas = async (page = 1, limit = 10) => {
    try {
      setLoading(true);
      const response = await realEstateAreaApi.getAll({ page, limit });
      setAreas(response.data.data || []);
      setPagination({
        current: response.data.metadata.pagination.page,
        pageSize: response.data.metadata.pagination.limit,
        total: response.data.metadata.pagination.totalDocs || 0,
      });
    } catch (error) {
      message.error(t("common:errors.fetchFailed"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAreas();
  }, []);

  const handleAdd = () => {
    setEditingArea(null);
    setIsModalVisible(true);
  };

  const handleEdit = (area: RealEstateArea) => {
    setEditingArea(area);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await realEstateAreaApi.delete(id);
      message.success(t("realEstateArea:deleteSuccess"));
      fetchAreas();
    } catch (error) {
      message.error(t("common:errors.deleteFailed"));
    }
  };

  const handleSave = async (values: any) => {
    try {
      if (editingArea) {
        await realEstateAreaApi.update(editingArea._id, values);
        message.success(t("realEstateArea:updateSuccess"));
      } else {
        await realEstateAreaApi.create(values);
        message.success(t("realEstateArea:createSuccess"));
      }
      setIsModalVisible(false);
      fetchAreas();
    } catch (error) {
      message.error(t("common:errors.saveFailed"));
    }
  };

  const handlePageChange = (page: number, pageSize?: number) => {
    fetchAreas(page, pageSize || pagination.pageSize);
  };

  return (
    <Card
      title={t("realEstateArea:title")}
      extra={
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          {t("realEstateArea:create")}
        </Button>
      }
    >
      <RealEstateAreaList
        areas={areas}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          onChange: handlePageChange,
        }}
      />

      <EditRealEstateAreaModal
        visible={isModalVisible}
        area={editingArea}
        onCancel={() => setIsModalVisible(false)}
        onSave={handleSave}
      />
    </Card>
  );
};

export default RealEstateAreas; 