
"use client";

import { useState } from "react";
import { registerUser } from "@/app/actions/auth/registerUser";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    const form = e.target;

    const user = {
      name: form.name.value,
      email: form.email.value,
      password: form.password.value,
    };

    try {
      // Register user
      const result = await registerUser(user);

      if (!result?.success) {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: result?.message || "Something went wrong.",
          confirmButtonColor: "#dc2626",
        });

        setLoading(false);
        return;
      }

      // Automatically login
      const loginResult = await signIn("credentials", {
        email: user.email,
        password: user.password,
        redirect: false,
      });

      if (!loginResult?.ok) {
        Swal.fire({
          icon: "warning",
          title: "Account Created",
          text: "Your account was created successfully, but automatic login failed. Please login manually.",
        });

        router.push("/login");
        return;
      }

      form.reset();

      await Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: `Welcome ${user.name}!`,
        timer: 1500,
        showConfirmButton: false,
      });

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Header Info */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Create an Account
        </h1>
        <p className="text-sm font-medium text-slate-500 mt-2">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-indigo-600 hover:text-indigo-500 hover:underline transition font-semibold"
          >
            Login
          </Link>
        </p>
      </div>

      {/* Main Registration Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Full Name Field */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-700">
            Full Name
          </label>
          <div className="relative">
            <input
              type="text"
              name="name"
              required
              placeholder="John Doe"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all font-medium text-sm"
            />
          </div>
        </div>

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
              placeholder="john@gmail.com"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all font-medium text-sm"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-700">
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all font-medium text-sm"
            />
          </div>
        </div>

        {/* Submit Action Container */}
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
                {/* CSS Inline Spinner Asset */}
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Creating Account...
              </>
            ) : (
              "Register"
            )}
          </button>
        </div>

      </form>
    </div>
  );
}

