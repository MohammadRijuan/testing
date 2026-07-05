"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[100vh] flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100/50 px-5 text-center">
      
      {/* Animated Visual Container */}
      <div className="relative mb-8 flex justify-center items-center">
        {/* Soft Glowing Background Accent */}
        <div className="absolute w-64 h-64 bg-indigo-100/60 rounded-full blur-3xl animate-pulse -z-10" />
        
        {/* Floating 404 Text */}
        <h1 className="text-9xl font-black tracking-tighter text-slate-200 select-none relative animate-[bounce_3s_infinite] ease-in-out">
          4
          <span className="text-indigo-600 inline-block hover:scale-110 transition-transform duration-300 cursor-default">
            0
          </span>
          4
        </h1>
      </div>

      {/* Messaging */}
      <div className="max-w-md mx-auto space-y-3 mb-10">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Lost in space?
        </h2>
        <p className="text-base text-slate-500 leading-relaxed">
          The page you are looking for might have been removed or is temporarily unavailable.
        </p>
      </div>

      {/* Call to Actions with Smooth Hover Effects */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-sm">
        <Link
          href="/"
          className="group flex items-center justify-center gap-2 w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3.5 rounded-xl font-semibold shadow-md shadow-indigo-100 transition-all duration-200 active:scale-[0.98]"
        >
          {/* Back Arrow Icon that slides left on hover */}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={2} 
            stroke="currentColor" 
            className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Go Back Home
        </Link>

      </div>

    </div>
  );
}