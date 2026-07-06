"use client";

import React from "react";

export default function AboutPage() {
  const values = [
    {
      id: "marketplace",
      title: "Curated Marketplace",
      description: "We completely reject cluttered, ad-heavy retail layouts to bring you a clean, intentionally designed shopping space focused entirely on premium product presentation.",
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 text-indigo-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
        </svg>
      ),
    },
    {
      id: "experience",
      title: "Frictionless Experience",
      description: "Every micro-interaction, container padding, and checkout step is fully optimized to ensure a smooth transition from item discovery to swift delivery confirmation.",
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 text-indigo-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l8.904-4.43c.477-.237.954-.474 1.43-.712a9.06 9.06 0 001.666-1.667 9.013 9.013 0 000-12.376 9.06 9.06 0 00-1.666-1.667c-.476-.238-.953-.475-1.43-.712L9 3l.813 5.096a.4.4 0 00.513.323l4.576-1.144a.4.4 0 01.442.544l-2.404 4.808a.4.4 0 000 .358l2.404 4.808a.4.4 0 01-.442.544l-4.576-1.144a.4.4 0 00-.513.323z" />
        </svg>
      ),
    },
    {
      id: "trust",
      title: "Absolute Integrity",
      description: "We partner directly with verified logistics networks and suppliers to ensure secure encryption, authentic retail guarantees, and an entirely transparent support system.",
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 text-indigo-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="w-full bg-white text-slate-800 antialiased select-none py-12 space-y-20">
      
      {/* Hero Headline Section */}
      <section className="max-w-4xl mx-auto text-center space-y-4 px-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-widest text-indigo-600 bg-indigo-50 uppercase">
          About BrokerBay
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]">
          Redefining the digital shopping standard.
        </h1>
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-500 font-medium leading-relaxed pt-2">
          We stand against chaotic setups and noisy digital storefront popups to engineer a balanced, fluid platform that elevates how you discover and purchase premium goods.
        </p>
      </section>

      {/* Split Statement Block */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-slate-100 rounded-3xl p-8 md:p-12 bg-slate-50/40">
        <div className="lg:col-span-5 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-500">
            Our Strategy
          </h2>
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
            Moving past cluttered retail conventions.
          </h3>
        </div>
        <div className="lg:col-span-7">
          <p className="text-sm sm:text-base text-slate-500 font-medium leading-relaxed">
            Most e-commerce platforms overwhelm screens with massive stacks of aggressive product grids and overlapping notices. BrokerBay introduces a clean presentation hierarchy, smooth visual styling, and direct quality curation to bring a confidently modern posture back to online retail.
          </p>
        </div>
      </section>

      {/* Core Values Grid */}
      <section className="space-y-10">
        <div className="text-center space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-500">
            Marketplace Pillars
          </h2>
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
            How we deliver value.
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((item) => (
            <div 
              key={item.id}
              className="p-6 rounded-2xl border border-slate-100 bg-white hover:border-indigo-100/80 hover:shadow-xl hover:shadow-indigo-950/[0.01] transition-all duration-300 flex flex-col gap-4 group"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-50 group-hover:bg-indigo-50 flex items-center justify-center flex-shrink-0 transition-colors duration-200">
                {item.icon}
              </div>
              <div className="space-y-2">
                <h4 className="text-base font-bold text-slate-900 transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Footer Row */}
      <section className="w-full text-center py-6">
        <div className="inline-flex flex-wrap gap-4 justify-center items-center">
          <button className="px-6 py-3.5 text-sm font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-lg shadow-indigo-600/10">
            Start Shopping
          </button>
          <button className="px-6 py-3.5 text-sm font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 active:scale-[0.98] transition-all">
            Support Center
          </button>
        </div>
      </section>

    </div>
  );
}