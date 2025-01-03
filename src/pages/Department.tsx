import React, { useState } from "react";
import { Button, Card, message } from "antd";
import { useTranslation } from "react-i18next";
import { PlusOutlined } from "@ant-design/icons";
import { mockDepartments } from "../services/mockDepartmentService";
import DepartmentList from "../components/Departments/DepartmentList";
import EditDepartmentModal from "../components/Departments/EditDepartmentModal";

const Departments: React.FC = () => {
  const { t } = useTranslation();
  const [departments, setDepartments] = useState(mockDepartments);
  const [editingDepartment, setEditingDepartment] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleAdd = () => {
    setEditingDepartment(null);
    setIsModalVisible(true);
  };

  const handleEdit = (department: any) => {
    setEditingDepartment(department);
    setIsModalVisible(true);
  };

  const handleDelete = (id: string) => {
    setDepartments(departments.filter((dept) => dept._id !== id));
    message.success(t("departments:deleteSuccess"));
  };

  const handleSave = (values: any) => {
    if (editingDepartment) {
      // Edit
      setDepartments(
        departments.map((dept) =>
          dept._id === editingDepartment._id ? { ...dept, ...values } : dept,
        ),
      );
      message.success(t("departments:updateSuccess"));
    } else {
      // Add
      const newDepartment = {
        _id: Date.now().toString(),
        ...values,
      };
      setDepartments([...departments, newDepartment]);
      message.success(t("departments:createSuccess"));
    }
    setIsModalVisible(false);
  };

  return (
    <Card
      title={t("departments:title")}
      extra={
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          {t("departments:addDepartment")}
        </Button>
      }
    >
      <DepartmentList
        departments={departments}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <EditDepartmentModal
        visible={isModalVisible}
        department={editingDepartment}
        onCancel={() => setIsModalVisible(false)}
        onSave={handleSave}
      />
    </Card>
  );
};

export default Departments;
