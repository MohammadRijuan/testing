"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";

export default function HeroCarousel() {
  const axios = useAxios();
  const [current, setCurrent] = useState(0);

  // =========================
  // FETCH BANNERS FROM API
  // =========================
  const { data: banners = [], isLoading } = useQuery({
  queryKey: ["hero-banners"],
  queryFn: async () => {
    const res = await axios.get("/hero-banners");
    return res.data.data; // ⬅ unwrap the array
  },
});

  // fallback (optional safety)
  const safeBanners = banners.length
    ? banners
    : [];

  // =========================
  // AUTO SLIDER
  // =========================
  const nextBanner = useCallback(() => {
    if (!safeBanners.length) return;

    setCurrent((prev) =>
      prev === safeBanners.length - 1 ? 0 : prev + 1
    );
  }, [safeBanners.length]);

  const prevBanner = () => {
    if (!safeBanners.length) return;

    setCurrent((prev) =>
      prev === 0 ? safeBanners.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const timer = setInterval(nextBanner, 5000);
    return () => clearInterval(timer);
  }, [nextBanner]);

  // reset index if banners change
  useEffect(() => {
    setCurrent(0);
  }, [safeBanners.length]);

  // =========================
  // LOADING STATE
  // =========================
  if (isLoading) {
    return (
      <div className="h-[500px] w-full rounded-3xl bg-slate-900 animate-pulse" />
    );
  }

  if (!safeBanners.length) {
    return (
      <div className="h-[500px] w-full rounded-3xl flex items-center justify-center bg-slate-950 text-white">
        No banners available
      </div>
    );
  }

  return (
    <section className="w-full relative min-h-[500px] md:min-h-[560px] flex items-center overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 select-none my-6 shadow-sm">

      {/* BACKGROUND IMAGES */}
      <div className="absolute inset-0 w-full h-full z-0">
        {safeBanners.map((banner, index) => (
          <div
            key={banner._id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === current
                ? "opacity-100 z-10"
                : "opacity-0 z-0"
            }`}
          >
            <img
              src={banner.imageUrl}
              alt={banner.alt || "Hero Banner"}
              className="w-full h-full object-cover object-center scale-105 motion-safe:animate-[subtle-zoom_20s_infinite_alternate]"
            />
          </div>
        ))}

        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent z-20" />
      </div>

      {/* STATIC CONTENT */}
      <div className="relative z-30 max-w-2xl px-8 md:px-16 space-y-5 text-left">

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
          Exclusive Platform
        </span>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1]">
          Confidently new, completely uncompromised.
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-xl">
          We break away from traditional layouts to bring modern branding.
        </p>

        <div className="pt-4 flex flex-wrap gap-4">
          <button className="px-6 py-3.5 text-sm font-bold text-white bg-indigo-600 rounded-xl">
            Explore Ecosystem
          </button>

          <button className="px-6 py-3.5 text-sm font-bold text-slate-300 bg-slate-900/60 border border-slate-800 rounded-xl">
            View Documentation
          </button>
        </div>
      </div>

      {/* CONTROLS */}
      <div className="absolute bottom-8 right-8 z-40 flex gap-2">

        <button
          onClick={prevBanner}
          className="w-10 h-10 rounded-xl bg-slate-900/40 border border-slate-800 text-slate-300"
        >
          ←
        </button>

        <button
          onClick={nextBanner}
          className="w-10 h-10 rounded-xl bg-slate-900/40 border border-slate-800 text-slate-300"
        >
          →
        </button>

      </div>

    </section>
  );
}