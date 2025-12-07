import React from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: role, isLoading: roleLoading } = useQuery({
    queryKey: ["role", user?.email],
    queryFn: async () => {
      const response = await axiosSecure(`/user/role/${user?.email}`);
      return response.data.role;
    },
    enabled: !loading && !!user?.email,
  });

  return [role, roleLoading];
};

export default useRole;
