"use client";

import { useEffect } from "react";
import Link from "next/link";
import { SITE } from "@/lib/config";
import { trackPurchase } from "@/lib/pixel";

type Props = {
  verified: boolean;
  downloadUrl: string;
};

export function SuccessClient({ verified, downloadUrl }: Props) {
  useEffect(() => {
    if (verified) trackPurchase();
  }, [verified]);

  return (
    <div className="min-h-screen bg-brand-cream">
      <nav className="sticky top-0 z-50 bg-brand-cream/90 backdrop-blur-md border-b border-brand-silver/60">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-display text-brand-slate text-lg">
              {SITE.brandName}
            </span>
          </Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-5 sm:px-8 py-12 sm:py-20 text-center">
        {verified ? <VerifiedContent downloadUrl={downloadUrl} /> : <InvalidContent />}
      </div>
    </div>
  );
}

function VerifiedContent({ downloadUrl }: { downloadUrl: string }) {
  return (
    <>
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-brand-gold/10 mb-6">
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          className="text-brand-gold"
        >
          <path
            d="M10 20l7 7L30 13"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <h1 className="font-display text-brand-slate text-3xl sm:text-4xl leading-[1.15] mb-4">
        You&apos;re all set
      </h1>
      <p className="font-body text-brand-muted text-lg leading-relaxed max-w-md mx-auto mb-8">
        Your copy of{" "}
        <strong className="text-brand-body">{SITE.tagline}</strong> is ready.
      </p>

      <a
        href={downloadUrl}
        download
        className="inline-flex items-center gap-2.5 bg-brand-gold text-white font-body font-semibold text-lg px-8 py-4 rounded-md hover:bg-brand-gold/90 transition-colors mb-10"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className="flex-shrink-0"
        >
          <path
            d="M10 3v10m0 0l-4-4m4 4l4-4M3 17h14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Download your guide (PDF)
      </a>

      <div className="bg-white rounded-md p-6 sm:p-8 text-left mb-8">
        <h2 className="font-display text-brand-slate text-xl mb-4">
          Suggested starting order
        </h2>
        <ol className="space-y-3 font-body text-brand-body text-[15px]">
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-brand-gold text-white flex items-center justify-center font-semibold text-sm">
              1
            </span>
            <span className="pt-0.5">
              Start with the Power Audit Worksheet. Figure out your daily Wh
              usage.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-brand-gold text-white flex items-center justify-center font-semibold text-sm">
              2
            </span>
            <span className="pt-0.5">
              Read Section 3 (What to Buy) for your tier. Check the shopping
              list.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-brand-gold text-white flex items-center justify-center font-semibold text-sm">
              3
            </span>
            <span className="pt-0.5">
              Use the System Sizing Worksheet to verify every component spec.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-brand-gold text-white flex items-center justify-center font-semibold text-sm">
              4
            </span>
            <span className="pt-0.5">
              Read the Expensive Mistakes section before you buy anything.
            </span>
          </li>
        </ol>
      </div>

      <p className="text-brand-muted text-sm font-body">
        Questions? Reply to your receipt email and we&apos;ll sort you out.
      </p>
    </>
  );
}

function InvalidContent() {
  return (
    <>
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-50 mb-6">
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          className="text-red-400"
        >
          <path
            d="M14 14l12 12M26 14L14 26"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <h1 className="font-display text-brand-slate text-3xl sm:text-4xl leading-[1.15] mb-4">
        Download link not found
      </h1>
      <p className="font-body text-brand-muted text-lg leading-relaxed max-w-md mx-auto mb-8">
        This link may have expired or is invalid. If you've purchased the guide,
        check your email receipt for a fresh download link.
      </p>

      <Link
        href="/"
        className="inline-flex items-center gap-2 text-brand-gold font-body font-semibold hover:text-brand-gold/80 transition-colors"
      >
        Back to homepage
      </Link>
    </>
  );
}
