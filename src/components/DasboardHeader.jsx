"use client";

import React from "react";

export default function DashboardHeader({ onOpenSidebar }) {
  return (
    <header className="h-16 border-b border-slate-200/80 bg-white flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30">
      
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger Activation Trigger Button */}
        <button 
          onClick={onOpenSidebar}
          className="lg:hidden p-2 -ml-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors"
          aria-label="Open sidebar"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        <h1 className="text-base sm:text-lg font-bold tracking-tight text-slate-900">
          Dashboard
        </h1>
      </div>

      <div className="flex items-center gap-3.5 group cursor-pointer select-none">
        <div className="text-right hidden sm:block">
          <span className="block text-sm font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors duration-150">
            Admin
          </span>
        </div>
        
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center shadow-sm text-slate-600 transition-all duration-200 group-hover:border-indigo-200 group-hover:ring-4 group-hover:ring-indigo-50/70">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors duration-150">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
        </div>
      </div>
    </header>
  );
}