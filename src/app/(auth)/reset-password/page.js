"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";
import Link from "next/link";
import { resetPassword } from "@/app/actions/auth/reset-password";


export default function ResetPassword() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    const form = e.target;

    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Passwords do not match",
      });

      return;
    }

    setLoading(true);

    try {
      const result = await resetPassword(token, password);

      if (result.success) {
        await Swal.fire({
          icon: "success",
          title: "Password Updated",
          text: "Your password has been changed successfully.",
        });

        router.push("/login");
      } else {
        Swal.fire({
          icon: "error",
          title: "Reset Failed",
          text: result.message,
        });
      }
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Something went wrong",
      });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 flex justify-center items-center px-4">

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-white">
          Reset Password
        </h1>

        <p className="text-gray-400 mt-2">
          Enter your new password below.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >

          <div>

            <label className="text-white block mb-2">
              New Password
            </label>

            <input
              type="password"
              name="password"
              required
              className="w-full rounded-lg bg-gray-950 border border-gray-700 px-4 py-3 text-white outline-none focus:border-blue-500"
            />

          </div>

          <div>

            <label className="text-white block mb-2">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              required
              className="w-full rounded-lg bg-gray-950 border border-gray-700 px-4 py-3 text-white outline-none focus:border-blue-500"
            />

          </div>

          <button
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 rounded-lg py-3 text-white font-semibold transition disabled:opacity-50"
          >
            {loading ? "Updating..." : "Reset Password"}
          </button>

        </form>

        <div className="text-center mt-6">

          <Link
            href="/login"
            className="text-blue-500 hover:underline"
          >
            Back to Login
          </Link>

        </div>

      </div>

    </div>
  );
}