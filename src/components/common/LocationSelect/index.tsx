// src/components/common/LocationSelect/index.tsx
import React, { useState, useEffect } from "react";
import { Form, Select } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

interface LocationSelectProps {
  required?: boolean;
  form?: any;
}

const LocationSelect: React.FC<LocationSelectProps> = ({ required, form }) => {
  const { provinces, districts, wards } = useSelector(
    (state: RootState) => state.location,
  );

  const [selectedProvince, setSelectedProvince] = useState<
    string | undefined
  >();
  const [selectedDistrict, setSelectedDistrict] = useState<
    string | undefined
  >();

  useEffect(() => {
    const province = form.getFieldValue("province");
    const district = form.getFieldValue("district");

    if (province) {
      setSelectedProvince(province);
    }
    if (district) {
      setSelectedDistrict(district);
    }
  }, [form.getFieldValue("province"), form.getFieldValue("district")]);

  const handleProvinceChange = (provinceCode: string) => {
    setSelectedProvince(provinceCode);
    setSelectedDistrict(undefined);
    form?.setFieldsValue({
      district: undefined,
      ward: undefined,
    });
  };

  const handleDistrictChange = (districtCode: string) => {
    setSelectedDistrict(districtCode);
    form?.setFieldsValue({
      ward: undefined,
    });
  };

  const filteredDistricts = districts.filter(
    (d) => d.provinceCode === selectedProvince,
  );
  const filteredWards = wards.filter(
    (w) => w.districtCode === selectedDistrict,
  );

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
          options={provinces.map((p) => ({
            label: p.name,
            value: p.code,
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
          disabled={!selectedProvince}
          options={filteredDistricts.map((d) => ({
            label: d.name,
            value: d.code,
          }))}
        />
      </Form.Item>

      <Form.Item name="ward" label="Ward" rules={[{ required: required }]}>
        <Select
          placeholder="Select ward"
          disabled={!selectedDistrict}
          options={filteredWards.map((w) => ({
            label: w.name,
            value: w.code,
          }))}
        />
      </Form.Item>
    </>
  );
};

export default LocationSelect;
