import { useState, useCallback } from "react";
import axios, { type AxiosRequestConfig } from "axios";
import { toast } from "react-toastify";
import { useAuth } from "@clerk/clerk-react";

export function useAxiosFetcher<T = any>(showErrorMessage: boolean = true) {
  const { getToken } = useAuth();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const fn = useCallback(async (url: string, config?: AxiosRequestConfig) => {
    setLoading(true);
    setError(null);
    const token = await getToken();

    try {
      const response = await axios(`${import.meta.env.VITE_SERVER_URL}${url}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        ...config,
      });

      setData(response.data.data);
      toast.success(response.data.message);

      return response.data;
    } catch (err: any) {
      const message =
        err.response?.data?.message || err.message || "Something went wrong";

      setError(err);

      if (!showErrorMessage) return;
      toast.error(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    data,
    loading,
    error,
    setError,
    fn,
    setData,
  };
}
