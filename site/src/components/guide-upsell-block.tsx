import { SITE } from "@/lib/config";

function CheckIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className="text-brand-amber flex-shrink-0 mt-0.5"
    >
      <path
        d="M5 10l3.5 3.5L15 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const benefits = [
  "Power Audit Worksheet (calculate your exact daily usage)",
  "Brand comparisons (REDARC vs Victron vs Enerdrive vs Renogy)",
  "Ready-to-use shopping lists for your exact tier",
  "System sizing worksheets (verify every component spec)",
  "The 7 expensive mistakes that cost people $500\u20132,000",
];

export function GuideUpsellBlock() {
  return (
    <div className="bg-white rounded-xl border border-brand-stone p-6 sm:p-8">
      <p className="text-brand-amber font-body font-semibold text-sm tracking-wide uppercase mb-2">
        Get the complete guide
      </p>
      <h3 className="font-display text-brand-navy text-2xl mb-2">
        Everything you need to buy with confidence
      </h3>
      <p className="font-body text-brand-muted text-[15px] mb-5">
        The quiz gives you the overview. The guide gives you:
      </p>
      <ul className="space-y-2.5 mb-6">
        {benefits.map((b) => (
          <li key={b} className="flex items-start gap-2.5">
            <CheckIcon />
            <span className="font-body text-brand-charcoal text-[15px]">{b}</span>
          </li>
        ))}
      </ul>
      <a
        href={SITE.checkoutUrl}
        className="inline-flex items-center gap-2 bg-brand-amber hover:bg-brand-amber-light text-white font-body font-semibold text-lg px-8 py-4 rounded-lg transition-colors shadow-lg shadow-brand-amber/20 w-full justify-center"
      >
        Get the Guide &mdash; ${SITE.price}
      </a>
      <p className="text-brand-muted text-xs font-body text-center mt-3">
        Instant PDF download. Prints beautifully on A4.
      </p>
    </div>
  );
}
