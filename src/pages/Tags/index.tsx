import React, { useEffect, useState } from "react";
import { Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import TagList from "../../components/Tag/TagList";
import EditTagModal from "../../components/Tag/EditTagModal";
import { tagApi } from "../../api/endpoints/tag";
import { Tag } from "../../types/tag";

const Tags: React.FC = () => {
  const { t } = useTranslation();
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
    total: 0,
  });

  const fetchTags = async (page = 1, limit = 20) => {
    try {
      setLoading(true);
      const response = await tagApi.getAll({ page, limit });
      setTags(response.data.data);
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
    fetchTags();
  }, []);

  const handleTableChange = (newPagination: any) => {
    fetchTags(newPagination.current, newPagination.pageSize);
  };

  const handleCreate = () => {
    setSelectedTag(null);
    setModalVisible(true);
  };

  const handleEdit = (tag: Tag) => {
    setSelectedTag(tag);
    setModalVisible(true);
  };

  const handleSave = async (values: { name: string }) => {
    try {
      if (selectedTag) {
        await tagApi.update(selectedTag._id, values);
        message.success(t("tags:updateSuccess"));
      } else {
        await tagApi.create(values);
        message.success(t("tags:createSuccess"));
      }
      setModalVisible(false);
      fetchTags(pagination.current, pagination.pageSize);
    } catch (error) {
      message.error(t("common:errors.saveFailed"));
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await tagApi.delete(id);
      message.success(t("tags:deleteSuccess"));
      fetchTags(pagination.current, pagination.pageSize);
    } catch (error) {
      message.error(t("common:errors.deleteFailed"));
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">{t("tags:title")}</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleCreate}
        >
          {t("tags:create")}
        </Button>
      </div>

      <TagList
        tags={tags}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        pagination={{
          ...pagination,
          onChange: handleTableChange,
        }}
      />

      <EditTagModal
        visible={modalVisible}
        tag={selectedTag}
        onCancel={() => setModalVisible(false)}
        onSave={handleSave}
      />
    </div>
  );
};

export default Tags; 