// components/LayoutWrapper.jsx
"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  const hideLayout =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/reset-password") ||
    pathname.startsWith("/forgot-password");

  return (
    <>
      {!hideLayout && <Navbar />}
      <div 
        className={
          hideLayout 
            ? "w-full flex-1" 
            : "w-full max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-5 flex-1"
        }
      >
        {children}
      </div>
      {!hideLayout && <Footer />}
    </>
  );
}