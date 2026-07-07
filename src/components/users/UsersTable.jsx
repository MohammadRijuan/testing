"use client";

import Image from "next/image";
import Swal from "sweetalert2";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";

export default function UsersTable({ users }) {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const makeAdminMutation = useMutation({
    mutationFn: async (userId) => {
      const res = await axios.patch(`/users/${userId}/role`, {
        role: "admin",
      });

      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "User has been promoted to admin.",
        timer: 1800,
        showConfirmButton: false,
      });
    },

    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Something went wrong.",
      });
    },
  });

  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Make ${user.name} an admin?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Make Admin",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#16a34a",
    }).then((result) => {
      if (result.isConfirmed) {
        makeAdminMutation.mutate(user._id);
      }
    });
  };

  return (
    <div className="rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Image
                    src={
                      user.image ||
                      "https://placehold.co/60x60/png"
                    }
                    alt={user.name}
                    width={45}
                    height={45}
                    className="rounded-full"
                  />

                  <span className="font-medium">
                    {user.name}
                  </span>
                </div>
              </TableCell>

              <TableCell>{user.email}</TableCell>

              <TableCell>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    user.role === "admin"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {user.role || "user"}
                </span>
              </TableCell>

              <TableCell className="text-right">
                {user.role === "admin" ? (
                  <Button disabled>
                    Admin
                  </Button>
                ) : (
                  <Button
                    onClick={() =>
                      handleMakeAdmin(user)
                    }
                  >
                    Make Admin
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}