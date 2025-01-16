import React from 'react';
import { Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import {
  Groups2Rounded,
  PersonRounded,
  CheckCircleRounded,
  BlockRounded,
  ApartmentRounded,
} from '@mui/icons-material';
import styles from './DashboardStats.module.css';

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => (
  <div className={styles.statCard}>
    <div className={styles.statContent}>
      <div className={styles.statInfo}>
        <h3 className={styles.statTitle}>{title}</h3>
        <div className={styles.statValue}>{value}</div>
      </div>
      <div className={styles.statIcon} style={{ backgroundColor: color }}>
        {icon}
      </div>
    </div>
  </div>
);

const DashboardStats: React.FC = () => {
  const { t } = useTranslation();

  const stats = [
    {
      title: t('dashboard:stats.totalDepartments'),
      value: 12,
      icon: <Groups2Rounded sx={{ fontSize: 28, color: 'white' }} />,
      color: '#6366F1',
    },
    {
      title: t('dashboard:stats.totalUsers'),
      value: 240,
      icon: <PersonRounded sx={{ fontSize: 28, color: 'white' }} />,
      color: '#6366F1',
    },
    {
      title: t('dashboard:stats.activeUsers'),
      value: 180,
      icon: <CheckCircleRounded sx={{ fontSize: 28, color: 'white' }} />,
      color: '#10B981',
    },
    {
      title: t('dashboard:stats.inactiveUsers'),
      value: 60,
      icon: <BlockRounded sx={{ fontSize: 28, color: 'white' }} />,
      color: '#EF4444',
    },
    {
      title: t('dashboard:stats.totalRealEstateSources'),
      value: 35,
      icon: <ApartmentRounded sx={{ fontSize: 28, color: 'white' }} />,
      color: '#6366F1',
    },
  ];

  return (
    <Row gutter={[24, 24]}>
      {stats.map((stat, index) => (
        <Col xs={24} sm={12} md={12} lg={6} key={index}>
          <StatCard {...stat} />
        </Col>
      ))}
    </Row>
  );
};

export default DashboardStats;
