"use client";

import { useRouter } from "next/navigation";
import { SITE } from "@/lib/config";
import { EmailCaptureForm } from "@/components/email-capture-form";

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

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-brand-amber flex-shrink-0 mt-0.5">
      <path d="M4 9l3.5 3.5L14 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function FreeGuidePage() {
  const router = useRouter();

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

      <div className="max-w-2xl mx-auto px-5 sm:px-8 py-12 sm:py-20">
        {/* Hero */}
        <div className="text-center mb-10">
          <p className="inline-block text-brand-amber font-body font-semibold text-sm tracking-wide uppercase mb-4">
            Free download
          </p>
          <h1 className="font-display text-brand-navy text-3xl sm:text-4xl lg:text-5xl leading-[1.15] mb-5">
            Your Caravan Solar Power Audit
          </h1>
          <p className="font-body text-brand-muted text-lg leading-relaxed max-w-lg mx-auto">
            Find out how much power your caravan actually uses each day. It takes 10 minutes and it's the first thing you need to figure out before buying anything.
          </p>
        </div>

        {/* What you get */}
        <div className="bg-white rounded-xl border border-brand-stone p-6 sm:p-8 mb-8">
          <h2 className="font-display text-brand-navy text-xl mb-4">
            What's in Chapter 0
          </h2>
          <ul className="space-y-3 mb-6">
            {[
              "Why solar matters for caravanning (the 60-second version)",
              "Power Audit Worksheet with pre-filled examples",
              "How to figure out your traveller tier (Weekender, Tourer, or Full-timer)",
              "What to do next once you know your numbers",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <CheckIcon />
                <span className="font-body text-brand-charcoal text-[15px]">{item}</span>
              </li>
            ))}
          </ul>

          <div className="border-t border-brand-stone pt-6">
            <p className="font-body text-brand-charcoal font-medium text-center mb-4">
              Enter your details and we'll send you straight to the download.
            </p>
            <EmailCaptureForm
              formId={SITE.kitFormIds.chapter0}
              tags={["source:chapter0"]}
              buttonText="Get the Free Chapter"
              onSuccess={() => router.push("/free-guide/confirm")}
            />
          </div>
        </div>

        {/* Trust note */}
        <p className="text-brand-muted text-sm font-body text-center">
          No credit card needed. Just a useful starting point for figuring out your solar setup.
        </p>
      </div>
    </div>
  );
}
