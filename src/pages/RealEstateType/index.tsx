import React, { useEffect, useState } from "react";
import { Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import RealEstateTypeList from "../../components/RealEstateType/RealEstateTypeList";
import EditRealEstateTypeModal from "../../components/RealEstateType/EditRealEstateTypeModal";
import { realEstateTypeApi } from "../../api/endpoints/realEstateType";
import { RealEstateType } from "../../types/realEstateType";

const RealEstateTypes: React.FC = () => {
  const { t } = useTranslation();
  const [realEstateTypes, setRealEstateTypes] = useState<RealEstateType[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRealEstateType, setSelectedRealEstateType] = useState<RealEstateType | null>(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchRealEstateTypes = async (page = 1, limit = 20) => {
    try {
      setLoading(true);
      const response = await realEstateTypeApi.getAll({ page, limit });
      setRealEstateTypes(response.data.data);
      setPagination({
        ...pagination,
        current: page,
        total: response.data.metadata.pagination.totalDocs,
      });
    } catch (error) {
      message.error(t("common:errors.fetchFailed"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRealEstateTypes();
  }, []);

  const handleTableChange = (newPagination: any) => {
    fetchRealEstateTypes(newPagination.current, newPagination.pageSize);
  };

  const handleCreate = () => {
    setSelectedRealEstateType(null);
    setModalVisible(true);
  };

  const handleEdit = (realEstateType: RealEstateType) => {
    setSelectedRealEstateType(realEstateType);
    setModalVisible(true);
  };

  const handleSave = async (values: { name: string }) => {
    try {
      if (selectedRealEstateType) {
        await realEstateTypeApi.update(selectedRealEstateType._id, values);
        message.success(t("realEstateType:updateSuccess"));
      } else {
        await realEstateTypeApi.create(values);
        message.success(t("realEstateType:createSuccess"));
      }
      setModalVisible(false);
      fetchRealEstateTypes(pagination.current, pagination.pageSize);
    } catch (error) {
      message.error(t("common:errors.saveFailed"));
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await realEstateTypeApi.delete(id);
      message.success(t("realEstateType:deleteSuccess"));
      fetchRealEstateTypes(pagination.current, pagination.pageSize);
    } catch (error) {
      message.error(t("common:errors.deleteFailed"));
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">{t("realEstateType:title")}</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleCreate}
        >
          {t("realEstateType:create")}
        </Button>
      </div>

      <RealEstateTypeList
        realEstateTypes={realEstateTypes}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        pagination={{
          ...pagination,
          onChange: handleTableChange,
        }}
      />

      <EditRealEstateTypeModal
        visible={modalVisible}
        realEstateType={selectedRealEstateType}
        onCancel={() => setModalVisible(false)}
        onSave={handleSave}
      />
    </div>
  );
};

export default RealEstateTypes; 