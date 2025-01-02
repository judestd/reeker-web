import React from "react";
import { Typography } from "antd";

const { Title } = Typography;

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => (
  <div className="mb-8">
    <Title level={2} className="!mb-2">
      {title}
    </Title>
    {subtitle && <p className="text-gray-600">{subtitle}</p>}
  </div>
);

export default PageHeader;
