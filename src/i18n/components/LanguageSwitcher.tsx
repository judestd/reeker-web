import React from "react";
import { Select } from "antd";
import { useTranslation } from "react-i18next";
import type { Languages } from "../locales";

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
      style={{ width: 140 }}
      className="!flex items-center"
    >
      <Option value="vi">
        <div className="flex items-center gap-2">
          <img 
            src="/images/flags/vi.svg" 
            alt="Tiếng Việt" 
            className="w-5 h-4 object-cover"
          />
          Tiếng Việt
        </div>
      </Option>
      <Option value="en">
        <div className="flex items-center gap-2">
          <img 
            src="/images/flags/en.svg" 
            alt="English" 
            className="w-5 h-4 object-cover"
          />
          English
        </div>
      </Option>
    </Select>
  );
};

export default LanguageSwitcher;
