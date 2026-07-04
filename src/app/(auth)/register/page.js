"use client";

import { registerUser } from "@/app/actions/auth/registerUser";
import Link from "next/link";

export default function Register() {

  const handleSubmit = (e) => { 
    e.preventDefault();
    const form = e.target;
    
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    registerUser({ name, email, password }); 
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-950 p-4 text-white">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-xl p-6 sm:p-8 space-y-6">
        
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">Create an account</h1>
          <p className="text-sm text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">
              Log in
            </Link>
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          
          {/* Full Name Field */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm font-medium text-gray-300">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              required
              className="w-full px-3.5 py-2 rounded-lg bg-gray-950 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
            />
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium text-gray-300">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              className="w-full px-3.5 py-2 rounded-lg bg-gray-950 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              className="w-full px-3.5 py-2 rounded-lg bg-gray-950 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 rounded-lg transition"
          >
            Register
          </button>
        </form>

      </div>
    </div>
  );
}

