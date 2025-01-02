import React from "react";
import { Card, Row, Col, Statistic } from "antd";
import { TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Team, User } from "../../types/user";

interface DashboardStatsProps {
  teams: Team[];
  user: User;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ teams, user }) => (
  <Row gutter={16}>
    <Col span={8}>
      <Card>
        <Statistic
          title="Total Teams"
          value={teams.length}
          prefix={<TeamOutlined />}
        />
      </Card>
    </Col>
    <Col span={8}>
      <Card>
        <Statistic title="Role" value={user?.role} prefix={<UserOutlined />} />
      </Card>
    </Col>
  </Row>
);

export default DashboardStats;
