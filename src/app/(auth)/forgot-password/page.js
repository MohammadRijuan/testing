
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
    <div className="w-full">
      {/* Header Info */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Forgot Password
        </h1>
        <p className="text-sm font-medium text-slate-500 mt-2">
          Enter your email address and we'll send you a password reset link.
        </p>
      </div>

      {/* Reset Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Email Address Field */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-700">
            Email Address
          </label>
          <div className="relative">
            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all font-medium text-sm"
            />
          </div>
        </div>

        {/* Action Button Container */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-xl py-3.5 text-sm font-semibold shadow-md transition-all duration-200 flex items-center justify-center gap-2 text-white active:scale-[0.99] ${
              loading
                ? "bg-slate-400 shadow-none cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-100"
            }`}
          >
            {loading ? (
              <>
                {/* Inline spinner element styling matching previous states */}
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Sending...
              </>
            ) : (
              "Send Reset Link"
            )}
          </button>
        </div>

      </form>

      {/* Redirection Navigation Link */}
      <div className="mt-6 text-center">
        <Link
          href="/login"
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-500 hover:underline transition"
        >
          ← Back to Login
        </Link>
      </div>
    </div>
  );
}

