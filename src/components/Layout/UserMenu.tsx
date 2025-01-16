import React from 'react';
import { Dropdown } from 'antd';
import { useTranslation } from 'react-i18next';
import {
  PersonOutlineRounded, SettingsOutlined,
  LogoutRounded
} from '@mui/icons-material';
import { User } from '../../types/user';
import { ROLE_NAME } from "../../types/user";
import type { MenuProps } from 'antd';

interface UserMenuProps {
  user: User;
  onLogout: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ user, onLogout }) => {
  const { t } = useTranslation();

  const items: MenuProps['items'] = [
    {
      key: 'header',
      type: 'group',
      label: (
        <div className="px-2.5 py-1.5">
          <div className="text-[15px] font-medium leading-tight">{user.fullName}</div>
          <div className="text-xs text-gray-500 leading-tight">{t("common:userMenu.viewProfile")}</div>
        </div>
      ),
    },
    {
      type: 'divider',
      className: '!my-0.5'
    },
    {
      key: 'profile',
      label: (
        <div className="flex items-center gap-2 px-2.5 py-1 text-[13px] leading-tight">
          <PersonOutlineRounded sx={{ fontSize: 15 }} className="text-gray-400" />
          {t("common:userMenu.editProfile")}
        </div>
      ),
    },
    {
      key: 'settings',
      label: (
        <div className="flex items-center gap-2 px-2.5 py-1 text-[13px] leading-tight">
          <SettingsOutlined sx={{ fontSize: 15 }} className="text-gray-400" />
          {t("common:userMenu.accountSettings")}
        </div>
      ),
    },
    {
      type: 'divider',
      className: '!my-0.5'
    },
    {
      key: 'logout',
      label: (
        <div className="flex items-center gap-2 px-2.5 py-1 text-[13px] leading-tight">
          <LogoutRounded sx={{ fontSize: 15 }} className="text-gray-400" />
          {t("common:userMenu.signOut")}
        </div>
      ),
      onClick: onLogout,
    },
  ];

  return (
    <Dropdown 
      menu={{ items }} 
      trigger={['click']}
      placement="bottomRight"
      overlayClassName="w-48"
    >
      <div className="flex items-center gap-3 cursor-pointer">
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
          {user?.fullName?.charAt(0)?.toUpperCase()}
        </div>
        <div className="flex flex-col">
          <span className="text-gray-900 font-medium">
            {user?.fullName}
          </span>
          <span className="text-gray-500 text-sm">
            {ROLE_NAME[user?.role]}
          </span>
        </div>
      </div>
    </Dropdown>
  );
};

export default UserMenu; 