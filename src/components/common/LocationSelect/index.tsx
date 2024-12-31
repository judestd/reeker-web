// src/components/common/LocationSelect/index.tsx
import React from 'react';
import { Form, Select } from 'antd';
import { useLocation } from '../../../hooks/useLocation';

interface LocationSelectProps {
  required?: boolean;
}

const LocationSelect: React.FC<LocationSelectProps> = ({ required }) => {
  const { 
    provinces, 
    districts, 
    wards,
    handleProvinceChange,
    handleDistrictChange
  } = useLocation();

  return (
    <>
      <Form.Item
        name="province"
        label="Province"
        rules={[{ required: required }]}
      >
        <Select
          placeholder="Select province"
          onChange={handleProvinceChange}
          options={provinces.map(p => ({ 
            label: p.name,
            value: p.code 
          }))}
        />
      </Form.Item>

      <Form.Item
        name="district"
        label="District"
        rules={[{ required: required }]}
      >
        <Select
          placeholder="Select district"
          onChange={handleDistrictChange}
          disabled={!districts.length}
          options={districts.map(d => ({
            label: d.name,
            value: d.code
          }))}
        />
      </Form.Item>

      <Form.Item
        name="ward"
        label="Ward"
        rules={[{ required: required }]}
      >
        <Select
          placeholder="Select ward"
          disabled={!wards.length}
          options={wards.map(w => ({
            label: w.name,
            value: w.code
          }))}
        />
      </Form.Item>
    </>
  );
};

export default LocationSelect;
