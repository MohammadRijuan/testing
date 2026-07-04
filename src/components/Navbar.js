"use client";

import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import BannerModal from "./BannerModal";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const { data: session, status } = useSession();

  return (
    <div className="p-4 bg-gray-900 text-white flex justify-between items-center">
      <h1>Navbar</h1>

      <div className="flex items-center gap-4">
        <button onClick={() => setOpen(true)}>
          Add Banner
        </button>

        {status === "loading" ? (
          <p>Loading...</p>
        ) : session ? (
          <>
            <span>Welcome, {session.user?.name}</span>

            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="hover:underline"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="hover:underline">
              Login
            </Link>

            <Link href="/register" className="hover:underline">
              Register
            </Link>
          </>
        )}
      </div>

      {open && <BannerModal onClose={() => setOpen(false)} />}
    </div>
  );
}