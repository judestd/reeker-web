import React, { useMemo } from "react";
import { Select, Form } from "antd";
import { useTranslation } from "react-i18next";
import type { FormInstance } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface AreaLocationSelectProps {
  value?: {
    province_code?: string;
    district_code?: string;
    ward_code?: string;
  };
  onChange?: (value: any) => void;
  form: FormInstance;
  required?: boolean;
  fieldName: number[];
}

const AreaLocationSelect: React.FC<AreaLocationSelectProps> = ({
  value,
  onChange,
  form,
  fieldName,
}) => {
  const { t } = useTranslation();

  const provinces = useSelector((state: RootState) => state.location.provinces);
  const allDistricts = useSelector(
    (state: RootState) => state.location.districts,
  );
  const allWards = useSelector((state: RootState) => state.location.wards);

  const districts = useMemo(() => {
    if (!value?.province_code) return [];
    return allDistricts.filter(
      (district) => district.provinceCode === value.province_code,
    );
  }, [allDistricts, value?.province_code]);

  const wards = useMemo(() => {
    if (!value?.district_code) return [];
    return allWards.filter((ward) => ward.districtCode === value.district_code);
  }, [allWards, value?.district_code]);

  const handleProvinceChange = (provinceCode: string) => {
    onChange?.({
      province_code: provinceCode,
      district_code: undefined,
      ward_code: undefined,
    });
  };

  const handleDistrictChange = (districtCode: string) => {
    onChange?.({
      ...value,
      district_code: districtCode,
      ward_code: undefined,
    });
  };

  const handleWardChange = (wardCode: string) => {
    onChange?.({
      ...value,
      ward_code: wardCode,
    });
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      <Form.Item
        validateStatus={
          !value?.province_code &&
          form?.getFieldError(["area", ...fieldName])?.length
            ? "error"
            : ""
        }
      >
        <Select
          value={value?.province_code}
          onChange={handleProvinceChange}
          placeholder={t("common:selectProvince")}
          options={provinces.map((province) => ({
            value: province.code,
            label: province.name,
          }))}
        />
      </Form.Item>

      <Form.Item
        validateStatus={
          !value?.district_code &&
          form?.getFieldError(["area", ...fieldName])?.length
            ? "error"
            : ""
        }
      >
        <Select
          value={value?.district_code}
          onChange={handleDistrictChange}
          placeholder={t("common:selectDistrict")}
          disabled={!value?.province_code}
          options={districts.map((district) => ({
            value: district.code,
            label: district.name,
          }))}
        />
      </Form.Item>

      <Form.Item
        validateStatus={
          !value?.ward_code &&
          form?.getFieldError(["area", ...fieldName])?.length
            ? "error"
            : ""
        }
      >
        <Select
          value={value?.ward_code}
          onChange={handleWardChange}
          placeholder={t("common:selectWard")}
          disabled={!value?.district_code}
          options={wards.map((ward) => ({
            value: ward.code,
            label: ward.name,
          }))}
        />
      </Form.Item>
    </div>
  );
};

export default AreaLocationSelect;
