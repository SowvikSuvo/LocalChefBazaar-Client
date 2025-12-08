import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import useAuth from "./useAuth";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { user, logOut, loading } = useAuth();
  const navigate = useNavigate();
  const interceptorsSet = useRef(false);

  useEffect(() => {
    if (!user || loading || interceptorsSet.current) return;

    // Attach token to requests
    const attachToken = async (config) => {
      const token = await user.getIdToken();
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    };

    const requestInterceptor = axiosInstance.interceptors.request.use(
      attachToken,
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (res) => res,
      (err) => {
        if (err?.response?.status === 401 || err?.response?.status === 403) {
          logOut().finally(() => navigate("/login"));
        }
        return Promise.reject(err);
      }
    );

    interceptorsSet.current = true;

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
      interceptorsSet.current = false;
    };
  }, [user, loading, logOut, navigate]);

  return axiosInstance;
};

export default useAxiosSecure;
