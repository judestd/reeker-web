import React, { useEffect, useState } from "react";
import { Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import DepartmentList from "../components/Departments/DepartmentList";
import { departmentApi } from "../api/endpoints/department";
import EditDepartmentModal from "../components/Departments/EditDepartmentModal";
import { Department } from "../types/department";

const DepartmentPage: React.FC = () => {
  const { t } = useTranslation();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDepartment, setSelectedDepartment] =
    useState<Department | null>(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const response = await departmentApi.getAll({
        page: pagination.current,
        limit: pagination.pageSize,
      });
      setDepartments(response.data.data);
      setPagination({
        ...pagination,
        total: response.data.metadata?.pagination?.totalDocs || 0,
      });
    } catch (error) {
      message.error(t("common:errors.fetchFailed"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, [pagination.current, pagination.pageSize]);

  const handleEdit = (department: Department) => {
    setSelectedDepartment(department);
    setModalVisible(true);
  };

  const handleStatusChange = async (id: string, isActive: boolean) => {
    try {
      await departmentApi.updateStatus(id, isActive);
      message.success(t("departments:statusUpdateSuccess"));
      fetchDepartments();
    } catch (error) {
      message.error(t("common:errors.updateFailed"));
    }
  };

  const handleSave = async (values: any) => {
    try {
      if (selectedDepartment) {
        await departmentApi.update(selectedDepartment._id, values);
        message.success(t("departments:updateSuccess"));
      } else {
        await departmentApi.create(values);
        message.success(t("departments:createSuccess"));
      }
      setModalVisible(false);
      fetchDepartments();
    } catch (error) {
      message.error(t("common:errors.saveFailed"));
    }
  };

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">{t("departments:title")}</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setSelectedDepartment(null);
            setModalVisible(true);
          }}
        >
          {t("departments:create")}
        </Button>
      </div>

      <div className="overflow-x-auto">
        <DepartmentList
          departments={departments}
          loading={loading}
          onEdit={handleEdit}
          onStatusChange={handleStatusChange}
          pagination={{
            ...pagination,
            onChange: (page: number, pageSize: number) =>
              setPagination({ ...pagination, current: page, pageSize }),
          }}
        />
      </div>

      {modalVisible && (
        <EditDepartmentModal
          visible={modalVisible}
          department={selectedDepartment}
          onCancel={() => setModalVisible(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default DepartmentPage;
