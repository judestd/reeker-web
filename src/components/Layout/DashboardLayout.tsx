import React, { useState } from "react";
import { Layout, Menu, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LanguageSwitcher from "../../i18n/components/LanguageSwitcher";
import { RootState } from "../../store";
import { logout } from "../../store/slices/authSlice";
import {
  DashboardRounded,
  PersonRounded,
  NotificationsRounded,
  ApartmentRounded,
  Groups2Rounded,
  SearchRounded,
  MenuRounded,
  MenuOpenRounded,
  LocationOnRounded,
} from '@mui/icons-material';
import styles from './Sidebar.module.css';
import { ROLE_NAME } from "../../types/user";
import UserMenu from './UserMenu';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const DashboardLayout: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      type: 'group' as const,
      label: t("common:menu.mainMenu"),
      key: 'main',
      children: [
        {
          key: "/dashboard",
          icon: <DashboardRounded className={styles.menuIcon} />,
          label: <span className={styles.menuText}>{t("common:nav.dashboard")}</span>,
          onClick: () => navigate("/dashboard"),
        },
        {
          key: "/realEstateSource",
          icon: <ApartmentRounded className={styles.menuIcon} />,
          label: <span className={styles.menuText}>{t("common:nav.realEstateSource")}</span>,
          onClick: () => navigate("/realEstateSource"),
        },
        {
          key: "/realEstateArea",
          icon: <LocationOnRounded className={styles.menuIcon} />,
          label: <span className={styles.menuText}>{t("common:nav.realEstateArea")}</span>,
          onClick: () => navigate("/realEstateArea"),
        },
      ]
    },
    {
      type: 'group' as const,
      label: t("common:menu.management"),
      key: 'management',
      children: [
        {
          key: "/departments",
          icon: <Groups2Rounded className={styles.menuIcon} />,
          label: <span className={styles.menuText}>{t("common:nav.departments")}</span>,
          onClick: () => navigate("/departments"),
        },
        {
          key: "/users",
          icon: <PersonRounded className={styles.menuIcon} />,
          label: <span className={styles.menuText}>{t("common:nav.users")}</span>,
          onClick: () => navigate("/users"),
        },
        {
          key: "/notifications",
          icon: <NotificationsRounded className={styles.menuIcon} />,
          label: <span className={styles.menuText}>{t("common:nav.notifications")}</span>,
          onClick: () => navigate("/notifications"),
        },
      ]
    }
  ];

  if (!user) return null;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider 
        collapsed={collapsed} 
        className={styles.sidebar}
        width={250}
        collapsedWidth={70}
        trigger={null}
      >
        <div className={`${styles.logo} ${collapsed ? styles.logoCollapsed : ''}`}>
          {collapsed ? (
            <Title level={2} className={styles.logoTextCollapsed} style={{color: 'white', marginBottom: '0px'}}>
              R
            </Title>
          ) : (
            <Title level={2} className={styles.logoText} style={{color: 'white', marginBottom: '0px'}}>
              Reeker
            </Title>
          )}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          className={styles.menu}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header className={styles.header}>
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setCollapsed(!collapsed)}
              className={styles.toggleButton}
            >
              {collapsed ? <MenuOpenRounded /> : <MenuRounded />}
            </button>
            <div className="bg-gray-100 rounded-lg flex items-center w-[320px]">
              <SearchRounded className="text-gray-400 ml-3" />
              <input
                placeholder="Search..."
                className="bg-transparent border-0 outline-none w-full h-10 px-3"
              />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <LanguageSwitcher />
            <UserMenu 
              user={user} 
              onLogout={() => {
                dispatch(logout());
                navigate("/login");
              }}
            />
          </div>
        </Header>
        <Content className="m-1">
          <div className="bg-gray-50 min-h-[calc(100vh-120px)] rounded-lg p-6">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
