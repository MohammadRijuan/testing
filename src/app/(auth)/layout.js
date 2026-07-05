
"use client";

import React from "react";
import Link from "next/link";

export default function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen w-full bg-slate-50">
      
      {/* 
        Left Side: The Visual Brand Showcase 
        Hidden on mobile/tablet, flex on large desktop layouts.
      */}
      <div className="hidden lg:flex lg:w-[50%] xl:w-[50%] bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-10 lg:p-12 relative overflow-hidden border-r border-slate-800 justify-center items-center">
        
        {/* Ambient Decorative Light Rays */}
        <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-violet-500/10 rounded-full blur-[100px] pointer-events-none" />

        {/* 
          Left Column Unified Container: 
          Uses justify-center and space-y to anchor all elements together.
          They will never drift apart or feel broken when zooming out.
        */}
        <div className="w-full max-w-md flex flex-col justify-center space-y-10 relative z-10 text-left">
          
          {/* Top Segment: Brand Emblem */}
          <div>
            <Link href="/" className="text-2xl font-bold tracking-tight text-white hover:opacity-90 transition inline-block">
              Broker<span className="text-indigo-400">Bay</span>
            </Link>
          </div>

          {/* Middle Segment: Catchy Headline & Graphic Card */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl xl:text-5xl font-black tracking-tight leading-[1.1] text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300">
                Simplify your <br />
                <span className="text-indigo-400">brokerage workflows.</span>
              </h1>
              <p className="text-base text-slate-400 leading-relaxed font-medium">
                Join thousands of professionals managing operations, tracking assets, and scaling securely on our platform.
              </p>
            </div>

            {/* Secure Lock UI Graphic Card */}
            <div className="p-6 bg-white/[0.03] backdrop-blur-md border border-white/[0.08] rounded-2xl shadow-2xl w-full transform hover:scale-[1.01] transition duration-300">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <div className="h-4 w-32 bg-white/10 rounded-md ml-2 flex items-center justify-center text-[10px] font-bold tracking-wider text-indigo-300 uppercase px-2">
                  Security Gateway
                </div>
              </div>
              
              {/* Animated Lock Infrastructure Centerpiece */}
              <div className="flex flex-col items-center justify-center py-4 space-y-4">
                <div className="relative flex items-center justify-center w-16 h-16">
                  {/* Concentric Pulse Rings */}
                  <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-md animate-ping opacity-75" />
                  <div className="absolute inset-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 animate-pulse" />
                  
                  {/* Core Lock Wrapper */}
                  <div className="relative p-3.5 bg-slate-900/80 border border-white/10 rounded-xl text-indigo-400 shadow-inner">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      strokeWidth={2} 
                      stroke="currentColor" 
                      className="w-6 h-6"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" 
                      />
                    </svg>
                  </div>
                </div>

                <div className="text-center space-y-1.5 w-full">
                  <div className="h-1.5 w-24 bg-indigo-400/40 rounded-full mx-auto animate-pulse" />
                  <div className="text-xs font-semibold text-slate-300 tracking-wide">
                    Encrypted Session
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Segment: Trust Indicator (Tethered inside the container) */}
          <div className="pt-2 flex items-center gap-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Enterprise Verified Infrastructure
          </div>

        </div>
      </div>

      {/* 
        Right Side: Form Content Injection Area
        Occupies full width on mobile, centered perfectly with left-aligned contents.
      */}
      <div className="w-full lg:w-[50%] xl:w-[50%] flex flex-col justify-center items-center p-5 sm:p-10 relative">
        
        {/* Subtle, abstract backdrop texture for the form side to break solid color blocks */}
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />
        
        {/* Main form container box */}
        <div className="w-full max-w-[440px] bg-white lg:bg-transparent p-6 sm:p-8 lg:p-0 rounded-2xl shadow-xl shadow-slate-200/50 lg:shadow-none border border-slate-100 lg:border-none relative z-10 text-left">
          
          {/* Fallback Mobile Logo (Hidden on Desktop) */}
          <div className="lg:hidden mb-8 text-center">
            <Link href="/" className="text-3xl font-extrabold tracking-tight text-slate-900">
              Broker<span className="text-indigo-600">Bay</span>
            </Link>
          </div>

          {children}
          
        </div>
      </div>

    </div>
  );
}

