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
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white px-4">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-xl p-8">

        <div className="mb-6">
          <h1 className="text-3xl font-bold">Create an Account</h1>

          <p className="text-gray-400 mt-2">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-500 hover:text-blue-400 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block mb-2 text-sm">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              required
              placeholder="John Doe"
              className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-2 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              required
              placeholder="john@gmail.com"
              className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-2 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm">
              Password
            </label>

            <input
              type="password"
              name="password"
              required
              placeholder="********"
              className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-2 outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-lg py-3 font-semibold transition ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-500"
            }`}
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

        </form>

      </div>
    </div>
  );
}