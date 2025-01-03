import type { Rule } from "antd/es/form";

export const useUserFormValidation = (): Record<string, Rule[]> => ({
  fullName: [
    { required: true, message: "Please enter full name" },
    { min: 2, message: "Name must be at least 2 characters" },
  ],
  email: [
    { required: true, message: "Please enter email" },
    { type: "email", message: "Please enter a valid email" },
  ],
  password: [
    { required: true, message: "Please enter password" },
    { min: 8, message: "Password must be at least 8 characters" },
    {
      pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      message: "Password must contain both letters and numbers",
    },
  ],
  role: [{ required: true, message: "Please select role" }],
});
