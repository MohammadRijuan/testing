"use client";

import React from "react";
import Secure from "./_assets/secure";
import Return from "./_assets/return";
import Delivery from "./_assets/delivery";
import Support from "./_assets/support";

export default function KeyBenefits() {
  const benefits = [
    {
      id: "payment",
      title: "Secure payment",
      description: "SSL encrypted checkout",
      icon: (
        <Secure></Secure>
      ),
    },
    {
      id: "returns",
      title: "Easy returns",
      description: "30-day hassle-free window",
      icon: (
        <Return></Return>
      ),
    },
    {
      id: "support",
      title: "Customer support",
      description: "Dedicated 24/7 assistance",
      icon: (
        <Support/>
      ),
    },
    {
      id: "delivery",
      title: "Fast delivery",
      description: "Dispatched within 24 hours",
      icon: (
        <Delivery></Delivery>
      ),
    },
  ];
  

  return (
    <section className="w-full select-none my-10">
      {/* Structural Layout Title */}
      <div className="mb-10 text-center space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-widest text-indigo-500">
          Core Features
        </h3>
        <h2 className="text-3xl font-black tracking-tight text-slate-800 sm:text-4xl">
          For Reliable Service
        </h2>
      </div>

      {/* Grid Layout Engine */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {benefits.map((item) => (
          <div 
            key={item.id} 
            className="flex flex-col gap-3 p-4 rounded-xl border border-slate-100 hover:border-indigo-100 bg-slate-50/30 hover:bg-indigo-50/10 transition-all duration-200 group"
          >
            {/* Soft Ambient Icon Workspace */}
            <div className="w-10 h-10 rounded-xl bg-slate-100/80 group-hover:bg-indigo-50 flex items-center justify-center transition-colors duration-200">
              {item.icon}
            </div>

            {/* Content Structural Text Stack */}
            <div className="space-y-0.5">
              <h4 className="text-sm font-bold text-slate-800 group-hover:text-slate-900 transition-colors">
                {item.title}
              </h4>
              <p className="text-xs text-slate-400 font-medium leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}