import React from 'react';
import { Card, Statistic, Row, Col } from 'antd';
import { TeamOutlined, UserOutlined, ClockCircleOutlined } from '@ant-design/icons';
import type { TeamStatsProps } from './types';

const TeamStats: React.FC<TeamStatsProps> = ({ members }) => {
  const activeMembers = members.filter(m => m.status === 'active').length;
  const temporaryLeave = members.filter(m => m.isTemporaryLeave).length;

  return (
    <Row gutter={16}>
      <Col span={8}>
        <Card>
          <Statistic
            title="Total Members"
            value={members.length}
            prefix={<TeamOutlined />}
          />
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Statistic
            title="Active Members"
            value={activeMembers}
            prefix={<UserOutlined />}
            valueStyle={{ color: '#3f8600' }}
          />
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Statistic
            title="On Leave"
            value={temporaryLeave}
            prefix={<ClockCircleOutlined />}
            valueStyle={{ color: '#cf1322' }}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default TeamStats;