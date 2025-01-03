// src/hooks/useLogin.ts
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { notification } from "antd";
import { authApi } from "../api/endpoints/auth";
import { userApi } from "../api/endpoints/user";
import { setCredentials } from "../store/slices/authSlice";
import { setStoredToken } from "../utils/auth";
import { locationApi } from "../api/endpoints/location";
import { setLocationData } from "../store/slices/locationSlice";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      // Login
      const loginResponse = await authApi.login({ ...values, isAdmin: true });

      const { access_token } = loginResponse.data.data;

      // Save token
      setStoredToken(access_token);

      // Get user data
      const userResponse = await userApi.getMe();
      const user = userResponse.data.data;

      // Update store
      dispatch(setCredentials({ user, token: access_token }));

      // Fetch location data
      const [provincesResponse, districtsResponse, wardsResponse] =
        await Promise.all([
          locationApi.getAllProvinces(),
          locationApi.getAllDistricts(),
          locationApi.getAllWards(),
        ]);

      const provinces = provincesResponse.data.data;
      const districts = districtsResponse.data.data;
      const wards = wardsResponse.data.data;

      // Update store with location data
      dispatch(setLocationData({ provinces, districts, wards }));

      notification.success({
        message: "Login Successful",
        description: "Welcome back!",
      });

      navigate("/");
    } catch (error) {
      notification.error({
        message: "Login Failed",
        description: "Invalid email or password",
      });
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading };
};
