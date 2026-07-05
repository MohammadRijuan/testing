"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();

  const getLinkClass = (path) => {
    const baseClass = "flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group relative";
    const activeClass = "bg-indigo-600/10 text-indigo-400 border-l-2 border-indigo-500 rounded-l-none pl-[12px]";
    const inactiveClass = "text-slate-400 hover:text-white hover:bg-slate-800/40";
    
    return `${baseClass} ${pathname === path ? activeClass : inactiveClass}`;
  };

  const getIconClass = (path) => {
    return `w-5 h-5 transition-colors ${pathname === path ? "text-indigo-400" : "text-slate-500 group-hover:text-indigo-400"}`;
  };

  return (
    <aside className={`
      fixed inset-y-0 left-0 w-64 bg-slate-900 border-r border-slate-800 text-slate-200 flex flex-col p-5 select-none z-50
      transition-transform duration-300 ease-in-out lg:static lg:translate-x-0
      ${isOpen ? "translate-x-0" : "-translate-x-full"}
    `}>
      
      {/* Sidebar Header Section */}
      <div className="mb-8 px-2 flex items-center justify-between">
        <h2 className="text-lg font-bold tracking-tight text-white flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          Dashboard
        </h2>

        <button 
          onClick={onClose}
          className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Close sidebar"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Navigation Layout Engine */}
      <nav className="space-y-1.5 flex-1">
        
        {/* Main Dashboard Link */}
        <Link href="/dashboard" className={getLinkClass("/dashboard")}>
          {/* Premium Asymmetric Layout Hub Icon */}
          <svg 
            className={getIconClass("/dashboard")} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            strokeWidth="1.5"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6A2.25 2.25 0 0 1 15.75 3.75H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25A2.25 2.25 0 0 1 13.5 8.25V6ZM13.5 15.75A2.25 2.25 0 0 1 15.75 13.5H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" 
            />
          </svg>
          <span>Dashboard</span>
        </Link>

        {/* Banner Components Link */}
        <Link href="/dashboard/banners" className={getLinkClass("/dashboard/banners")}>
          {/* Premium Wide-Format Media Canvas Icon */}
          <svg 
            className={getIconClass("/dashboard/banners")} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            strokeWidth="1.5"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M3.75 4.5h16.5a1.5 1.5 0 0 1 1.5 1.5v12a1.5 1.5 0 0 1-1.5 1.5H3.75A1.5 1.5 0 0 1 2.25 18V6a1.5 1.5 0 0 1 1.5-1.5ZM2.25 9h19.5M2.25 14h19.5" 
            />
          </svg>
          <span>Banner</span>
        </Link>
        
      </nav>

      {/* Persistent Tiny Brand Signature */}
      <div className="pt-4 border-t border-slate-800/60 text-[11px] font-bold uppercase tracking-widest text-slate-600 px-2">
        Broker<span className="text-slate-500">Bay</span> v2.0
      </div>

    </aside>
  );
}