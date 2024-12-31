import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { useTranslation } from 'react-i18next';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LanguageSwitcher from '../../i18n/components/LanguageSwitcher';
import { RootState } from '../../store';
import { logout } from '../../store/slices/authSlice';

const { Header, Sider, Content } = Layout;

const DashboardLayout: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const [collapsed, setCollapsed] = useState(false);

  if (!user) return null;

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={[
            {
              key: '/dashboard',
              label: t('common:nav.dashboard'),
              onClick: () => navigate('/dashboard')
            },
            {
              key: '/teams',
              label: t('common:nav.teams'),
              onClick: () => navigate('/teams')
            },
            {
              key: '/members',
              label: t('common:nav.members'),
              onClick: () => navigate('/members')
            },
            {
              key: '/users',
              label: t('common:nav.users'),
              onClick: () => navigate('/users')
            },
            {
              key: '/notifications',
              label: t('common:nav.notifications'),
              onClick: () => navigate('/notifications')
            },
            {
              key: 'logout',
              label: t('auth:logout'),
              onClick: () => {
                dispatch(logout());
                navigate('/login');
              }
            }
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ 
          padding: '0 16px', 
          background: '#fff', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'flex-end' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <LanguageSwitcher />
            <span>{t('dashboard:welcome', { name: user?.name })}</span>
          </div>
        </Header>
        <Content style={{ margin: '16px' }}>
          <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;