import React, { useState, useEffect } from "react";
import { Card, Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { RealEstateSource } from "../types/realEstateSource";
import { realEstateSourceApi } from "../api/endpoints/realEstateSource";
import RealEstateSourceList from "../components/RealEstateSource/RealEstateSourceList";
import EditRealEstateSourceModal from "../components/RealEstateSource/EditRealEstateSourceModal";

const RealEstateSources: React.FC = () => {
  const { t } = useTranslation();
  const [sources, setSources] = useState<RealEstateSource[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingSource, setEditingSource] = useState<RealEstateSource | null>(
    null,
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  console.log("sources", sources);
  const fetchSources = async (page = 1, limit = 10) => {
    try {
      setLoading(true);
      const response = await realEstateSourceApi.getAll({ page, limit });
      setSources(response.data.data?.data || []);
      setPagination({
        current: response.data.data.pagination.page,
        pageSize: response.data.data.pagination.limit,
        total: response.data.data.pagination.totalDocs || 0,
      });
    } catch (error) {
      message.error(t("common:errors.fetchFailed"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSources();
  }, []);

  const handleAdd = () => {
    setEditingSource(null);
    setIsModalVisible(true);
  };

  const handleEdit = (source: RealEstateSource) => {
    setEditingSource(source);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await realEstateSourceApi.delete(id);
      message.success(t("realEstateSource:deleteSuccess"));
      fetchSources();
    } catch (error) {
      message.error(t("common:errors.deleteFailed"));
    }
  };

  const handleSave = async (values: any) => {
    try {
      if (editingSource) {
        await realEstateSourceApi.update(editingSource._id, values);
        message.success(t("realEstateSource:updateSuccess"));
      } else {
        await realEstateSourceApi.create(values);
        message.success(t("realEstateSource:createSuccess"));
      }
      setIsModalVisible(false);
      fetchSources();
    } catch (error) {
      message.error(t("common:errors.saveFailed"));
    }
  };

  const handlePageChange = (page: number, pageSize?: number) => {
    fetchSources(page, pageSize || pagination.pageSize);
  };

  return (
    <Card
      title={t("realEstateSource:title")}
      extra={
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          {t("realEstateSource:create")}
        </Button>
      }
    >
      <RealEstateSourceList
        sources={sources}
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

      <EditRealEstateSourceModal
        visible={isModalVisible}
        source={editingSource}
        onCancel={() => setIsModalVisible(false)}
        onSave={handleSave}
      />
    </Card>
  );
};

export default RealEstateSources;
