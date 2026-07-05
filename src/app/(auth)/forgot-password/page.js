"use client";

import { useState } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import { forgotPassword } from "@/app/actions/auth/forgotPassword";


export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    const form = e.target;
    const email = form.email.value;

    try {
      const result = await forgotPassword(email);

      if (result.success) {
        Swal.fire({
          icon: "success",
          title: "Email Sent",
          text: "If an account exists with that email, a password reset link has been sent.",
        });

        form.reset();
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: result.message,
        });
      }
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "Please try again later.",
      });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">

      <div className="w-full max-w-md rounded-xl bg-gray-900 border border-gray-800 p-8">

        <h1 className="text-3xl font-bold text-white">
          Forgot Password
        </h1>

        <p className="text-gray-400 mt-2">
          Enter your email address and we'll send you a password reset link.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >

          <div>

            <label className="block text-sm text-gray-300 mb-2">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none focus:border-blue-500"
            />

          </div>

          <button
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-500 transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

        </form>

        <div className="mt-6 text-center">

          <Link
            href="/login"
            className="text-blue-500 hover:underline"
          >
            ← Back to Login
          </Link>

        </div>

      </div>

    </div>
  );
}