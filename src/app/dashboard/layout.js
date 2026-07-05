"use client";

import DashboardHeader from "@/components/DasboardHeader";
import Sidebar from "@/components/Sidebar";
import React, { useState } from "react";
// import Sidebar from "./Sidebar";
// import DashboardHeader from "./DashboardHeader";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-slate-50/50 text-slate-800 antialiased">
      
      {/* Dynamic Mobile Backdrop Blur Ring Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Render Clean Sidebar Layer */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Right Workspace Column Viewport */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        
        {/* Render Clean Header Layer */}
        <DashboardHeader onOpenSidebar={() => setSidebarOpen(true)} />

        {/* Dynamic Inner Target Content Slot Router Viewport */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1 overflow-y-auto">
          {children}
        </main>

      </div>
    </div>
  );
}