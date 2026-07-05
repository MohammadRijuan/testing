"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 border-t border-slate-200/60 text-slate-600">
      {/* 
        Container limited to max 1340px, centered with mx-auto. 
        p-5 ensures exactly 20px of padding on top, bottom, left, and right.
      */}
      <div className="max-w-[1340px] mx-auto p-5">
        
        {/* Top Grid Layer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-8">
          
          {/* Brand/Bio Column (Spans 2 columns on wide screens) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="text-2xl font-bold tracking-tight text-slate-900 hover:opacity-90 transition inline-block">
              Broker<span className="text-indigo-600">Bay</span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-500 max-w-sm">
              Empowering brokers and businesses with cutting edge tools, premium products, and world-class transactional services.
            </p>
            {/* Social Icons Container */}
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="p-2 bg-slate-200/50 hover:bg-slate-200 text-slate-500 hover:text-indigo-600 rounded-xl transition" aria-label="Twitter">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="#" className="p-2 bg-slate-200/50 hover:bg-slate-200 text-slate-500 hover:text-indigo-600 rounded-xl transition" aria-label="LinkedIn">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.75a1.75 1.75 0 110-3.5 1.75 1.75 0 010 3.5zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93-1.11 0-1.62.77-1.62 1.93V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.5c1.78 0 3.32 1.06 3.32 3.72z"/></svg>
              </a>
              <a href="#" className="p-2 bg-slate-200/50 hover:bg-slate-200 text-slate-500 hover:text-indigo-600 rounded-xl transition" aria-label="GitHub">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2A10 10 0 002 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Platform Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-900 tracking-wider uppercase">Platform</h3>
            <ul className="space-y-2.5 text-sm font-medium">
              <li><Link href="/services" className="hover:text-indigo-600 transition">Services</Link></li>
              <li><Link href="/products" className="hover:text-indigo-600 transition">Products</Link></li>
              <li><Link href="/pricing" className="hover:text-indigo-600 transition">Pricing</Link></li>
              <li><Link href="/releases" className="hover:text-indigo-600 transition">Releases</Link></li>
            </ul>
          </div>

          {/* Column 3: Corporate Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-900 tracking-wider uppercase">Company</h3>
            <ul className="space-y-2.5 text-sm font-medium">
              <li><Link href="/about" className="hover:text-indigo-600 transition">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-indigo-600 transition">Careers</Link></li>
              <li><Link href="/blog" className="hover:text-indigo-600 transition">Press & Blog</Link></li>
              <li><Link href="/contact" className="hover:text-indigo-600 transition">Contact</Link></li>
            </ul>
          </div>

          {/* Column 4: Compliance/Legal Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-900 tracking-wider uppercase">Security</h3>
            <ul className="space-y-2.5 text-sm font-medium">
              <li><Link href="/privacy" className="hover:text-indigo-600 transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-indigo-600 transition">Terms of Service</Link></li>
              <li><Link href="/security" className="hover:text-indigo-600 transition">Trust Center</Link></li>
              <li><Link href="/status" className="hover:text-indigo-600 transition">System Status</Link></li>
            </ul>
          </div>

        </div>

        {/* Divider Ribbon Line */}
        <hr className="border-slate-200/80 my-2" />

        {/* Bottom Layer: Attribution & Legal Notice */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 text-xs font-medium text-slate-400">
          <p>© {currentYear} BrokerBay Inc. All rights reserved.</p>
          <div className="flex items-center gap-1 text-slate-400/80">
            <span>Built with precision</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-rose-400 animate-pulse">
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          </div>
        </div>

      </div>
    </footer>
  );
}