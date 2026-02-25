"use client";

import { useEffect } from "react";
import { SITE } from "@/lib/config";
import { trackPurchase } from "@/lib/pixel";

function SunIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className={className}>
      <circle cx="10" cy="10" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M10 2v2M10 16v2M2 10h2M16 10h2M4.93 4.93l1.41 1.41M13.66 13.66l1.41 1.41M4.93 15.07l1.41-1.41M13.66 6.34l1.41-1.41"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function SuccessPage() {
  useEffect(() => {
    trackPurchase();
  }, []);

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-brand-cream/90 backdrop-blur-md border-b border-brand-stone/60">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <SunIcon className="text-brand-amber" />
            <span className="font-display text-brand-navy text-lg">{SITE.brandName}</span>
          </a>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-5 sm:px-8 py-12 sm:py-20 text-center">
        {/* Success icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-brand-amber/10 mb-6">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-brand-amber">
            <path d="M10 20l7 7L30 13" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <h1 className="font-display text-brand-navy text-3xl sm:text-4xl leading-[1.15] mb-4">
          You're all set
        </h1>
        <p className="font-body text-brand-muted text-lg leading-relaxed max-w-md mx-auto mb-10">
          Your copy of <strong className="text-brand-charcoal">{SITE.tagline}</strong> is ready to download. Check your email for the receipt and download link.
        </p>

        {/* What to do next */}
        <div className="bg-white rounded-xl border border-brand-stone p-6 sm:p-8 text-left mb-8">
          <h2 className="font-display text-brand-navy text-xl mb-4">Suggested starting order</h2>
          <ol className="space-y-3 font-body text-brand-charcoal text-[15px]">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-brand-amber text-white flex items-center justify-center font-semibold text-sm">1</span>
              <span className="pt-0.5">Start with the Power Audit Worksheet. Figure out your daily Wh usage.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-brand-amber text-white flex items-center justify-center font-semibold text-sm">2</span>
              <span className="pt-0.5">Read Section 3 (What to Buy) for your tier. Check the shopping list.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-brand-amber text-white flex items-center justify-center font-semibold text-sm">3</span>
              <span className="pt-0.5">Use the System Sizing Worksheet to verify every component spec.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-brand-amber text-white flex items-center justify-center font-semibold text-sm">4</span>
              <span className="pt-0.5">Read the Expensive Mistakes section before you buy anything.</span>
            </li>
          </ol>
        </div>

        <p className="text-brand-muted text-sm font-body">
          Questions? Reply to your receipt email and we'll sort you out.
        </p>
      </div>
    </div>
  );
}
