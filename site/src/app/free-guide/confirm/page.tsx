import { SITE } from "@/lib/config";
import { GuideUpsellBlock } from "@/components/guide-upsell-block";

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

function DownloadIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="text-white">
      <path d="M11 3v12M11 15l-4-4M11 15l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 17h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function FreeGuideConfirmPage() {
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
        {/* Download section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-amber/10 mb-5">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-brand-amber">
              <path d="M8 16l5.5 5.5L24 11" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="font-display text-brand-navy text-3xl sm:text-4xl leading-[1.15] mb-4">
            Your download is ready
          </h1>
          <p className="font-body text-brand-muted text-lg leading-relaxed max-w-md mx-auto mb-8">
            Chapter 0 covers the power audit. It's the first thing to work through before making any buying decisions.
          </p>
          <a
            href={SITE.chapter0DownloadUrl}
            download
            className="inline-flex items-center gap-2.5 bg-brand-amber hover:bg-brand-amber-light text-white font-body font-semibold text-lg px-8 py-4 rounded-lg transition-colors shadow-lg shadow-brand-amber/20"
          >
            <DownloadIcon />
            Download Chapter 0 (PDF)
          </a>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 my-12">
          <div className="flex-1 h-px bg-brand-stone" />
          <p className="font-body text-brand-muted text-sm">Ready for the full picture?</p>
          <div className="flex-1 h-px bg-brand-stone" />
        </div>

        {/* Guide upsell */}
        <GuideUpsellBlock />
      </div>
    </div>
  );
}
