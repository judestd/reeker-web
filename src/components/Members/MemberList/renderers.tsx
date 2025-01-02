import { Role } from "../../../types/user";
import { Tag } from "antd";

export const renderRole = (role: Role) => (
  <Tag color={role === Role.ADMIN ? "red" : "blue"} className="rounded-full">
    {role}
  </Tag>
);

export const renderStatus = (status: boolean) => (
  <Tag
    color={status ? "green" : "orange"}
    className="rounded-full"
  >
    {status ? "Active" : "Inactive"}
  </Tag>
);
