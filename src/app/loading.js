
"use client";

import React from "react";
import Image from "next/image"; 

export default function Loading() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-50 relative overflow-hidden">
      
      {/* Subtle background mesh dot texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-60 pointer-events-none" />

      <div className="relative flex flex-col items-center space-y-6 z-10">
        
        {/* Animated Security & Engine Loader Compound */}
        <div className="relative flex items-center justify-center w-20 h-20">
          
          {/* Outer Layer: Ambient Glow Pulse Waves */}
          <div className="absolute inset-0 rounded-full bg-indigo-600/10 blur-md animate-ping opacity-75 [animation-duration:2s]" />
          <div className="absolute inset-2 rounded-full bg-indigo-600/5 border border-indigo-500/20 animate-pulse" />
          
          {/* Middle Layer: High Performance Circular Progress Spinner */}
          <div className="absolute inset-0 rounded-full border-4 border-slate-200/80 border-t-indigo-600 animate-spin [animation-duration:0.8s]" />

          {/* Core Layer: Clean Lock Icon Container */}
          <div className="relative p-3.5 bg-white rounded-full shadow-lg text-indigo-600 border border-slate-100 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </div>
        </div>

        {/* Brand Signifier & Subtext */}
        <div className="text-center space-y-2">
          <div className="text-xl font-bold tracking-tight text-slate-900">
            Broker<span className="text-indigo-600">Bay</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 animate-pulse">
              Loading secure session
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

