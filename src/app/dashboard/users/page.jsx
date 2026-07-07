"use client";

import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";
import UsersTable from "@/components/users/UsersTable";

export default function UsersPage() {
  const axios = useAxios();

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get("/users");
      return res.data.data;
    },
  });

  if (isLoading) {
    return (
      <div className="py-10 text-center">
        Loading users...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          Users
        </h1>

        <p className="text-gray-500">
          Manage all registered users.
        </p>
      </div>

      <UsersTable
        users={users}
        refetch={refetch}
      />

    </div>
  );
}