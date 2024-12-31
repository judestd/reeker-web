import React from 'react';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';
import type { Languages } from '../locales';

const { Option } = Select;

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const handleChange = (lang: Languages) => {
    i18n.changeLanguage(lang);
  };

  return (
    <Select 
      value={i18n.language as Languages}
      onChange={handleChange}
      style={{ width: 120 }}
    >
      <Option value="vi">Tiếng Việt</Option>
      <Option value="en">English</Option>
    </Select>
  );
};

export default LanguageSwitcher;