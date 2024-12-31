import React from 'react';
import { Select } from 'antd';
import { LANGUAGE_LABELS, SUPPORTED_LANGUAGES } from '../../constants/languages';
import { useLanguage } from '../../hooks/useLanguage';
import { LanguageSwitcherProps } from './types';

const { Option } = Select;

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className }) => {
  const { currentLanguage, changeLanguage } = useLanguage();

  return (
    <Select 
      value={currentLanguage}
      onChange={changeLanguage}
      className={className}
      style={{ width: 120 }}
    >
      {Object.entries(LANGUAGE_LABELS).map(([value, label]) => (
        <Option key={value} value={value}>
          {label}
        </Option>
      ))}
    </Select>
  );
};

export default LanguageSwitcher;