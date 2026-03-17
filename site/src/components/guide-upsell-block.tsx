import { SITE } from "@/lib/config";

function GoldDot() {
  return (
    <span className="flex-shrink-0 w-2 h-2 rounded-full bg-brand-gold mt-1.5" />
  );
}

const benefits = [
  "Your full component list with exact specs for your tier",
  "Brand comparisons (REDARC vs Victron vs Enerdrive vs Renogy)",
  "A ready-to-use shopping list from Australian retailers",
  "System sizing worksheets so every component matches",
  "The 7 expensive mistakes that cost people $500\u20132,000",
];

export function GuideUpsellBlock() {
  return (
    <div className="bg-white rounded-md p-6 sm:p-8">
      <p className="label-caps mb-2">
        Get the complete guide
      </p>
      <h3 className="font-display text-brand-slate text-2xl mb-2">
        Everything you need to buy with confidence
      </h3>
      <p className="font-body text-brand-muted text-[15px] mb-5">
        The quiz gives you the overview. The guide gives you:
      </p>
      <ul className="space-y-2.5 mb-6">
        {benefits.map((b) => (
          <li key={b} className="flex items-start gap-2.5">
            <GoldDot />
            <span className="font-body text-brand-body text-[15px]">{b}</span>
          </li>
        ))}
      </ul>
      <a
        href={SITE.checkoutUrl}
        className="inline-flex items-center gap-2 bg-brand-gold hover:bg-brand-gold/90 text-white font-body font-semibold text-lg px-8 py-4 rounded transition-colors w-full justify-center"
      >
        Get the Guide — ${SITE.price}
      </a>
      <p className="text-brand-muted text-xs font-body text-center mt-3">
        Instant PDF download. Prints beautifully on A4.
      </p>
      <p className="text-brand-muted text-xs font-body text-center mt-1.5">
        Not useful? Full refund, no questions asked.
      </p>
    </div>
  );
}
