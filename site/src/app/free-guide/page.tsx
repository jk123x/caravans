"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { SITE } from "@/lib/config";
import { EmailCaptureForm } from "@/components/email-capture-form";

function GoldDot() {
  return (
    <span className="flex-shrink-0 w-2 h-2 rounded-full bg-brand-gold mt-1.5" />
  );
}

export default function FreeGuidePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-brand-cream/90 backdrop-blur-md border-b border-brand-silver/60">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-display text-brand-slate text-lg">{SITE.brandName}</span>
          </Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-5 sm:px-8 py-12 sm:py-20">
        {/* Hero */}
        <div className="text-center mb-10">
          <p className="label-caps mb-4">
            Free download
          </p>
          <h1 className="font-display text-brand-slate text-3xl sm:text-4xl lg:text-5xl leading-[1.15] mb-5">
            Your Caravan Solar Power Audit
          </h1>
          <p className="font-body text-brand-muted text-lg leading-relaxed max-w-lg mx-auto">
            Find out how much power your caravan actually uses each day. It takes 10 minutes and it's the first thing you need to figure out before buying anything.
          </p>
        </div>

        {/* What you get */}
        <div className="bg-white rounded-md p-6 sm:p-8 mb-8">
          <h2 className="font-display text-brand-slate text-xl mb-4">
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
                <GoldDot />
                <span className="font-body text-brand-body text-[15px]">{item}</span>
              </li>
            ))}
          </ul>

          <div className="border-t border-brand-silver/50 pt-6">
            <p className="font-body text-brand-body font-semibold text-center mb-4">
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
