import { ColumnsType } from "antd/es/table";
import { Tag, Space, Button, Popconfirm, Typography, Tooltip } from "antd";
import { ROLE_NAME, Role, User } from "../../types/user";
import { TFunction } from "i18next";
import { Department } from "../../types/department";
import {
  EditRounded,
  DeleteRounded,
  CheckCircleRounded,
  BlockRounded,
} from '@mui/icons-material';
import type { AlignType } from 'rc-table/lib/interface';

const { Text } = Typography;

interface ColumnProps {
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
  t: TFunction;
  user: User;
}

const getRoleColor = (role: Role): string => {
  switch (role) {
    case Role.SUPER_ADMIN:
      return '#1d4ed8'; // deep blue
    case Role.ADMIN:
      return '#4f46e5'; // indigo
    case Role.OWNER:
      return '#7c3aed'; // violet
    case Role.OWNER_MANAGER:
      return '#9333ea'; // purple
    case Role.CUSTOMER:
      return '#10b981'; // emerald
    case Role.CUSTOMER_MANAGER:
      return '#059669'; // green
    case Role.DEPARTMENT_MANAGER:
      return '#0891b2'; // cyan
    default:
      return '#6366f1'; // default blue
  }
};

export const columns = ({
  onEdit,
  onDelete,
  t,
  user,
}: ColumnProps): ColumnsType<User> => [
  {
    title: t("users:fields.fullName"),
    dataIndex: "fullName",
    key: "fullName",
    width: 150,
    render: (fullName: string) => (
      <Text strong className="text-gray-800">
        {fullName}
      </Text>
    ),
  },
  {
    title: t("users:fields.email"),
    dataIndex: "email",
    key: "email",
    width: 200,
    render: (email: string) => (
      <Text className="text-gray-600">
        {email}
      </Text>
    ),
  },
  {
    title: t("users:fields.role"),
    dataIndex: "role",
    key: "role",
    width: 130,
    align: 'center' as AlignType,
    render: (role: Role) => (
      <Tag 
        color={getRoleColor(role)}
        className="min-w-[90px] !px-2 !py-0.5 rounded-full text-xs font-medium"
      >
        <span className="flex items-center justify-center">
          {ROLE_NAME[role]}
        </span>
      </Tag>
    ),
  },
  {
    title: t("users:fields.department"),
    dataIndex: "department",
    key: "department",
    width: 150,
    render: (department: Department) => (
      <Text className="text-gray-600">
        {department?.name || "-"}
      </Text>
    ),
  },
  {
    title: t("users:fields.status"),
    dataIndex: "isActive",
    key: "isActive",
    align: 'center' as AlignType,
    width: 120,
    render: (isActive: boolean) => (
      <Tag
        color={isActive ? "success" : "error"}
        className="min-w-[90px] !px-2 !py-0.5 rounded-full text-xs font-medium"
      >
        <span className="flex items-center justify-center gap-1">
          {isActive ? (
            <CheckCircleRounded sx={{ fontSize: 14 }} />
          ) : (
            <BlockRounded sx={{ fontSize: 14 }} />
          )}
          {isActive ? t("users:status.active") : t("users:status.inactive")}
        </span>
      </Tag>
    ),
  },
  {
    title: t("users:fields.phone"),
    dataIndex: "phone",
    key: "phone",
    render: (phone: string) => (
      <Text className="text-gray-600">
        {phone || "-"}
      </Text>
    ),
  },
  // {
  //   title: t("users:fields.birthDay"),
  //   dataIndex: "birthday",
  //   key: "birthday",
  //   render: (date: string) => (
  //     <Text className="text-gray-600">
  //       {date ? new Date(date).toLocaleDateString() : "-"}
  //     </Text>
  //   ),
  // },
  // {
  //   title: t("users:fields.gender"),
  //   dataIndex: "gender",
  //   key: "gender",
  //   render: (gender: string) => (
  //     <Text className="text-gray-600">
  //       {gender ? t(`users:gender.${gender}`) : "-"}
  //     </Text>
  //   ),
  // },
  // {
  //   title: t("common:createdAt"),
  //   dataIndex: "createdAt",
  //   key: "createdAt",
  //   render: (date: string) => (
  //     <Text className="text-gray-600">
  //       {new Date(date).toLocaleDateString()}
  //     </Text>
  //   ),
  // },
  {
    title: t("common:actions.actions"),
    key: "actions",
    align: 'center' as AlignType,
    width: 100,
    fixed: 'right' as const,
    render: (_, record) => {
      const isSuperAdmin = user.role === Role.SUPER_ADMIN;
      const isAdmin = user.role === Role.ADMIN;
      const isRecordAdmin = record.role === Role.ADMIN;
      const isRecordSuperAdmin = record.role === Role.SUPER_ADMIN;

      const canEdit = isSuperAdmin || (isAdmin && !isRecordAdmin && !isRecordSuperAdmin);
      const canDelete = isSuperAdmin || (isAdmin && !isRecordAdmin && !isRecordSuperAdmin);

      return (
        <Space size={1} className="flex justify-center">
          <Tooltip title={t("common:actions.edit")}>
            <Button
              type="text"
              disabled={!canEdit}
              className={`
                !p-0 !w-8 !h-8 !flex !items-center !justify-center 
                hover:!bg-blue-50 
                ${canEdit ? '!text-blue-600' : '!text-gray-300'}
                disabled:!bg-transparent
              `}
              onClick={() => onEdit(record)}
            >
              <EditRounded sx={{ fontSize: 18 }} />
            </Button>
          </Tooltip>
          <Popconfirm
            title={t("users:deleteUser.title")}
            description={t("users:deleteUser.description")}
            onConfirm={() => onDelete(record._id)}
            okText={t("common:actions.yes")}
            cancelText={t("common:actions.no")}
          >
            <Tooltip title={t("common:actions.delete")}>
              <Button
                type="text"
                disabled={!canDelete}
                className={`
                  !p-0 !w-8 !h-8 !flex !items-center !justify-center 
                  hover:!bg-red-50
                  ${canDelete ? '!text-red-600' : '!text-gray-300'}
                  disabled:!bg-transparent
                `}
              >
                <DeleteRounded sx={{ fontSize: 18 }} />
              </Button>
            </Tooltip>
          </Popconfirm>
        </Space>
      );
    },
  },
];
