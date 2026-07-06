
"use client";

import React from "react";

export default function CustomerReviews() {
  // High-fidelity modern dummy review entries
  const reviews = [
    {
      id: 1,
      name: "Fahad Bin Nur",
      handle: "@Fahesu_design",
      role: "Creative Director",
      rating: 5,
      text: "The speed and fluid layout interface completely transformed our daily development pipeline. It feels confidently modern rather than just another standard, recycled framework template.",

    },
    {
      id: 2,
      name: "Mahatir Ayat",
      handle: "@Ayat_zef",
      role: "Market Specialist",
      rating: 5,
      text: "Clean asset structures, hyper-responsive container rendering, and flawless layout boundaries straight out of the box. Exceptional architecture that scales effortlessly on ultra-wide screens.",

    },
    {
      id: 3,
      name: "Faysal Ahmed",
      handle: "Codetroon",
      role: "Operation Manager",
      rating: 5,
      text: "An absolute masterclass in minimalist design integration. The precision geometry and structural consistency give our brand an elite, high-end look that builds instant client trust.",
   
    },
  ];

  return (
    <section className="w-full select-none my-16">
      {/* Structural Minimal Section Title Stack */}
      <div className="mb-10 text-center space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-widest text-indigo-500">
          Wall of Trust
        </h3>
        <h2 className="text-3xl font-black tracking-tight text-slate-800 sm:text-4xl">
          Loved by builders countrywide.
        </h2>
      </div>

      {/* Modern Asymmetric Review Grid Engine */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="p-6 rounded-2xl border border-slate-100 bg-slate-50/30 hover:bg-white hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-950/[0.02] transition-all duration-300 flex flex-col justify-between group relative"
          >
            {/* Top Row: Star System & Timestamp */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-0.5">
                {[...Array(review.rating)].map((_, i) => (
                  <svg
                    key={i}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="w-4 h-4 text-amber-400 fill-amber-400/10 group-hover:fill-amber-400 transition-all duration-300"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499c.151-.312.592-.312.743 0l2.305 4.673 5.158.75c.344.05.482.472.233.716l-3.733 3.639 1.054 5.14c.07.34-.287.6-.593.44L12 18.257l-4.664 2.455c-.306.16-.663-.1-.593-.44l1.054-5.14-3.733-3.639c-.249-.244-.11-.667.233-.717l5.158-.75 2.305-4.672Z"
                    />
                  </svg>
                ))}
              </div>
             
            </div>

            {/* Middle Row: Content Prose Statement */}
            <p className="text-sm font-medium leading-relaxed text-slate-500 group-hover:text-slate-600 transition-colors flex-1 mb-6">
              "{review.text}"
            </p>

            {/* Bottom Row: User Node Credentials */}
            <div className="pt-4 border-t border-slate-100/80 flex items-center gap-3">
              {/* Minimal Geometric Avatar Shell */}
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-50 to-slate-100 flex items-center justify-center font-bold text-xs text-indigo-600 border border-slate-200/40 uppercase">
                {review.name.charAt(0)}
              </div>

              {/* Text Meta Stack */}
              <div className="space-y-0.5 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-bold text-slate-800 group-hover:text-slate-900 transition-colors truncate">
                    {review.name}
                  </h4>
                  {/* Micro Verified Trust Badge */}
                  <svg 
                    viewBox="0 0 24 24" 
                    fill="currentColor" 
                    className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0"
                  >
                    <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.49 4.49 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.49 4.49 0 0 1-1.307 3.497 4.49 4.49 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.49 4.49 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-[11px] font-medium text-slate-400 truncate">
                  {review.role} • <span className="text-slate-400/70 font-normal">{review.handle}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

