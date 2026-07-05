
"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-slate-50/90 backdrop-blur-md border-b border-slate-200/60 shadow-sm transition-all duration-300">
     
      <div className="max-w-[1340px] mx-auto p-5 flex items-center justify-between relative">
        
        {/* Brand Logo */}
        <Link href="/" className="text-2xl font-bold tracking-tight text-slate-900 hover:opacity-90 transition">
          Broker<span className="text-indigo-600">Bay</span>
        </Link>

        {/* Middle Links (Desktop Only - Now visible at 1024px and up) */}
        <div className="hidden lg:flex items-center gap-8 font-medium text-slate-600">
          <Link href="/services" className="hover:text-indigo-600 transition-colors">Services</Link>
          <Link href="/products" className="hover:text-indigo-600 transition-colors">Products</Link>
          <Link href="/about" className="hover:text-indigo-600 transition-colors">About</Link>
          <Link href="/contact" className="hover:text-indigo-600 transition-colors">Contact</Link>
        </div>

        {/* Right Action Block */}
        <div className="flex items-center gap-4">
          
          {/* Cart Icon (Visible on all breakpoints) */}
          <Link 
            href="/cart" 
            className="p-2.5 text-slate-600 hover:text-indigo-600 hover:bg-slate-200/50 rounded-xl transition relative"
            aria-label="View Cart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-600 rounded-full"></span>
          </Link>

          {/* Auth System (Desktop Only - Now visible at 1024px and up) */}
          <div className="hidden lg:flex items-center gap-4">
            {status === "loading" ? (
              <div className="h-5 w-16 bg-slate-200 animate-pulse rounded-md" />
            ) : session ? (
              <>
                <span className="text-sm text-slate-500 font-medium">
                  Welcome, <span className="text-slate-800 font-semibold">{session.user?.name}</span>
                </span>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="bg-rose-50 hover:bg-rose-100 text-rose-600 px-4 py-2 rounded-xl text-sm font-semibold transition duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-slate-600 hover:text-indigo-600 px-3 py-2 text-sm font-semibold transition">
                  Login
                </Link>
                <Link href="/register" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-sm shadow-indigo-100 transition duration-200">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Hamburger Menu Toggle (Mobile Only - Now hidden ONLY at 1024px and up) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2.5 text-slate-600 hover:bg-slate-200/50 rounded-xl transition"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Flyout Menu (Now displays on everything below 1024px) */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-slate-50 border-b border-slate-200 shadow-xl px-5 py-6 flex flex-col gap-5 lg:hidden z-40">
            <div className="flex flex-col gap-4 font-medium text-slate-600">
              <Link href="/services" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-indigo-600 transition">Services</Link>
              <Link href="/products" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-indigo-600 transition">Products</Link>
              <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-indigo-600 transition">About</Link>
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-indigo-600 transition">Contact</Link>
            </div>
            
            <hr className="border-slate-200" />
            
            <div className="flex flex-col gap-3">
              {status === "loading" ? (
                <div className="h-10 bg-slate-200 animate-pulse rounded-xl" />
              ) : session ? (
                <>
                  <span className="text-sm text-slate-500 font-medium px-1">
                    Welcome, {session.user?.name}
                  </span>
                  <button
                    onClick={() => { setIsMobileMenuOpen(false); signOut({ callbackUrl: "/" }); }}
                    className="w-full bg-rose-50 hover:bg-rose-100 text-rose-600 py-2.5 rounded-xl text-sm font-semibold text-center transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center text-slate-600 hover:bg-slate-200/50 py-2.5 rounded-xl text-sm font-semibold transition border border-slate-200">
                    Login
                  </Link>
                  <Link href="/register" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl text-sm font-semibold transition shadow-sm shadow-indigo-100">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

