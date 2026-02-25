import { SITE } from "@/lib/config";
import { GuideMockup } from "@/components/guide-mockup";
import { FaqSection } from "@/components/faq-section";
import { AnimatedSection } from "@/components/animated-section";

function SunIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
    >
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

const features = [
  {
    title: "Power Audit Worksheet",
    desc: "Figure out exactly how much power your setup uses each day. Pre-filled examples for common caravan setups so you're not starting from scratch.",
    icon: "audit",
  },
  {
    title: "Component Guide",
    desc: "Batteries, panels, controllers, inverters, DC-DC chargers. What each one does in plain English, what to buy, and what to skip.",
    icon: "components",
  },
  {
    title: "Brand Comparisons",
    desc: "REDARC vs Victron vs Enerdrive vs Renogy. Side-by-side comparison with clear recommendations for different budgets and use cases.",
    icon: "compare",
  },
  {
    title: "Shopping Lists by Tier",
    desc: "Ready-to-use lists for weekenders ($1,500), tourers ($3,000-$5,000), and full-timers ($5,000-$8,000+). Take it to the shop.",
    icon: "list",
  },
  {
    title: "System Sizing Worksheets",
    desc: "Use your power audit numbers to calculate exactly what battery, solar, controller, and inverter specs you need. No guessing.",
    icon: "calc",
  },
  {
    title: "Expensive Mistakes Guide",
    desc: "The 7 mistakes that cost people $500 to $2,000. What each one costs, why people make it, and how to avoid every one of them.",
    icon: "mistakes",
  },
];

const tiers = [
  {
    name: "Weekender",
    desc: "Lights, phone charging, fridge. A few nights at a time.",
    specs: ["200W solar", "100-200Ah lithium", "1000W inverter or none"],
    cost: "$1,500 - $2,500",
  },
  {
    name: "Tourer",
    desc: "Fridge, TV, laptops, lights. Weeks on the road, mix of parks and free camping.",
    specs: [
      "300-400W solar + portable",
      "200-300Ah lithium",
      "2000W inverter",
    ],
    cost: "$3,000 - $5,000",
    featured: true,
  },
  {
    name: "Full-timer",
    desc: "Everything above plus microwave, coffee machine, hair dryer. Living on the road full time.",
    specs: [
      "400-600W solar + portable",
      "300-400Ah lithium",
      "3000W inverter",
    ],
    cost: "$5,000 - $8,000+",
  },
];

function FeatureIcon({ type }: { type: string }) {
  const icons: Record<string, React.ReactNode> = {
    audit: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect
          x="4"
          y="3"
          width="20"
          height="22"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M9 9h10M9 13h10M9 17h6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    components: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect
          x="3"
          y="14"
          width="10"
          height="11"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <rect
          x="15"
          y="14"
          width="10"
          height="11"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M8 14V5a2 2 0 012-2h8a2 2 0 012 2v9"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="14" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    compare: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path
          d="M4 7h20M4 14h20M4 21h20"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="10" cy="7" r="2" fill="currentColor" />
        <circle cx="18" cy="14" r="2" fill="currentColor" />
        <circle cx="12" cy="21" r="2" fill="currentColor" />
      </svg>
    ),
    list: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path
          d="M9 7h14M9 14h14M9 21h14"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <rect x="4" y="5.5" width="3" height="3" rx="0.5" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M4.5 14l1 1 2-2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="4" y="19.5" width="3" height="3" rx="0.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    calc: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect
          x="5"
          y="3"
          width="18"
          height="22"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <rect x="8" y="6" width="12" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="10" cy="16" r="1.2" fill="currentColor" />
        <circle cx="14" cy="16" r="1.2" fill="currentColor" />
        <circle cx="18" cy="16" r="1.2" fill="currentColor" />
        <circle cx="10" cy="20" r="1.2" fill="currentColor" />
        <circle cx="14" cy="20" r="1.2" fill="currentColor" />
        <circle cx="18" cy="20" r="1.2" fill="currentColor" />
      </svg>
    ),
    mistakes: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path
          d="M14 4L3 24h22L14 4z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M14 11v6M14 20v1"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  };
  return (
    <div className="w-12 h-12 rounded-lg bg-brand-amber/10 flex items-center justify-center text-brand-amber">
      {icons[type]}
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-brand-cream/90 backdrop-blur-md border-b border-brand-stone/60">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SunIcon className="text-brand-amber" />
            <span className="font-display text-brand-navy text-lg">
              {SITE.brandName}
            </span>
          </div>
          <a
            href={SITE.checkoutUrl}
            className="hidden sm:inline-flex items-center gap-2 bg-brand-amber hover:bg-brand-amber-light text-white font-body font-medium text-sm px-5 py-2.5 rounded-lg transition-colors"
          >
            Get the Guide &mdash; ${SITE.price}
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 pt-12 sm:pt-20 pb-16 sm:pb-24">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Text */}
            <div className="flex-1 text-center lg:text-left">
              <AnimatedSection delay={0}>
                <p className="inline-block text-brand-amber font-body font-semibold text-sm tracking-wide uppercase mb-4">
                  For caravanners who are sick of guessing
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <h1 className="font-display text-brand-navy text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.15] mb-6">
                  Know Exactly What Solar Setup Your Caravan Needs
                </h1>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <p className="font-body text-brand-muted text-lg sm:text-xl leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                  Clear recommendations, brand comparisons, and ready-to-use
                  shopping lists. No jargon. No theory. No trying to sell you a
                  specific brand.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.3}>
                <div className="flex flex-col sm:flex-row items-center gap-4 lg:justify-start justify-center">
                  <a
                    href={SITE.checkoutUrl}
                    className="inline-flex items-center gap-2 bg-brand-amber hover:bg-brand-amber-light text-white font-body font-semibold text-lg px-8 py-4 rounded-lg transition-colors shadow-lg shadow-brand-amber/20"
                  >
                    Get the Guide &mdash; ${SITE.price}
                  </a>
                  <p className="text-brand-muted text-sm font-body">
                    PDF download. Prints on A4.
                  </p>
                </div>
                <a
                  href={SITE.quizUrl}
                  className="inline-flex items-center gap-1.5 text-brand-amber hover:text-brand-amber-light font-body font-medium text-base mt-4 transition-colors"
                >
                  Not sure what you need? Take the 2-minute quiz &rarr;
                </a>
              </AnimatedSection>
            </div>

            {/* Mockup */}
            <div className="flex-shrink-0">
              <GuideMockup />
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-brand-navy">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-8 sm:py-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
            <div>
              <p className="font-display text-white text-2xl sm:text-3xl">
                900,000+
              </p>
              <p className="text-white/50 font-body text-sm mt-1">
                registered RVs in Australia
              </p>
            </div>
            <div>
              <p className="font-display text-white text-2xl sm:text-3xl">
                $3K &ndash; $10K
              </p>
              <p className="text-white/50 font-body text-sm mt-1">
                typical solar system spend
              </p>
            </div>
            <div>
              <p className="font-display text-brand-amber text-2xl sm:text-3xl">
                0
              </p>
              <p className="text-white/50 font-body text-sm mt-1">
                beginner-friendly guides that exist
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Stakes */}
      <section className="bg-brand-cream">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 py-16 sm:py-24 text-center">
          <AnimatedSection>
            <h2 className="font-display text-brand-navy text-3xl sm:text-4xl leading-snug mb-6">
              You&apos;re about to spend thousands on solar components
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <p className="font-body text-brand-muted text-lg sm:text-xl leading-relaxed mb-8">
              The difference between getting it right and getting it wrong?
              About <strong className="text-brand-charcoal">$500 to $2,000</strong> in
              wasted money, plus a system that doesn&apos;t actually do what you
              need.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <p className="font-body text-brand-muted text-lg leading-relaxed">
              Everyone says &ldquo;do your research.&rdquo; But the research is
              scattered across hundreds of forum posts, YouTube videos, and brand
              websites that are really just trying to sell you their gear. This
              guide pulls it all together in one place, with recommendations that
              aren&apos;t tied to any brand.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* What's Inside */}
      <section className="bg-brand-stone/50">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
          <AnimatedSection>
            <div className="text-center mb-12">
              <p className="text-brand-amber font-body font-semibold text-sm tracking-wide uppercase mb-3">
                What&apos;s inside
              </p>
              <h2 className="font-display text-brand-navy text-3xl sm:text-4xl">
                Everything you need to decide and buy
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {features.map((f, i) => (
              <AnimatedSection key={f.title} delay={i * 0.07}>
                <div className="bg-white rounded-xl p-6 border border-brand-stone/70 h-full">
                  <FeatureIcon type={f.icon} />
                  <h3 className="font-display text-brand-navy text-xl mt-4 mb-2">
                    {f.title}
                  </h3>
                  <p className="font-body text-brand-muted leading-relaxed text-[15px]">
                    {f.desc}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* System Tiers */}
      <section className="bg-brand-cream">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
          <AnimatedSection>
            <div className="text-center mb-12">
              <p className="text-brand-amber font-body font-semibold text-sm tracking-wide uppercase mb-3">
                Three system tiers
              </p>
              <h2 className="font-display text-brand-navy text-3xl sm:text-4xl mb-4">
                The guide covers every level
              </h2>
              <p className="font-body text-brand-muted text-lg max-w-2xl mx-auto">
                Whether you need a basic weekend setup or a full off-grid system,
                you&apos;ll get specific recommendations and a complete shopping
                list for your tier.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {tiers.map((tier, i) => (
              <AnimatedSection key={tier.name} delay={i * 0.1}>
                <div
                  className={`rounded-xl p-6 h-full border ${
                    tier.featured
                      ? "bg-brand-navy text-white border-brand-navy"
                      : "bg-white border-brand-stone/70"
                  }`}
                >
                  <h3
                    className={`font-display text-2xl mb-2 ${
                      tier.featured ? "text-white" : "text-brand-navy"
                    }`}
                  >
                    {tier.name}
                  </h3>
                  <p
                    className={`font-body text-sm mb-5 leading-relaxed ${
                      tier.featured ? "text-white/60" : "text-brand-muted"
                    }`}
                  >
                    {tier.desc}
                  </p>
                  <ul className="space-y-2.5 mb-6">
                    {tier.specs.map((spec) => (
                      <li key={spec} className="flex items-start gap-2.5">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          className={`flex-shrink-0 mt-0.5 ${
                            tier.featured
                              ? "text-brand-amber"
                              : "text-brand-amber"
                          }`}
                        >
                          <path
                            d="M4 9l3.5 3.5L14 6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span
                          className={`font-body text-sm ${
                            tier.featured ? "text-white/80" : "text-brand-charcoal"
                          }`}
                        >
                          {spec}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div
                    className={`pt-4 border-t ${
                      tier.featured
                        ? "border-white/15"
                        : "border-brand-stone"
                    }`}
                  >
                    <p
                      className={`font-display text-xl ${
                        tier.featured ? "text-brand-amber" : "text-brand-navy"
                      }`}
                    >
                      {tier.cost}
                    </p>
                    <p
                      className={`font-body text-xs mt-0.5 ${
                        tier.featured ? "text-white/40" : "text-brand-muted"
                      }`}
                    >
                      typical component cost (DIY)
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #c67c1b 0%, #d4890e 40%, #e39a2e 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-opacity='1'%3E%3Cpath d='M0 0h20v20H0zM20 20h20v20H20z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative max-w-3xl mx-auto px-5 sm:px-8 py-16 sm:py-20 text-center">
          <AnimatedSection>
            <h2 className="font-display text-white text-3xl sm:text-4xl mb-4">
              Less than the cost of one solar panel
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <p className="font-body text-white/80 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
              For ${SITE.price}, you get the complete guide with worksheets,
              brand comparisons, shopping lists, and system sizing tools. One bad
              purchasing decision costs 10&ndash;40x more than this guide.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 sm:p-8 mb-8 max-w-md mx-auto border border-white/20">
              <ul className="space-y-3 text-left">
                {[
                  "Complete PDF guide (~30 pages)",
                  "Power Audit Worksheet",
                  "System Sizing Worksheet",
                  "Brand comparison tables",
                  "Shopping lists for all 3 tiers",
                  "Expensive mistakes breakdown",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckIcon />
                    <span className="font-body text-white text-[15px]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <a
              href={SITE.checkoutUrl}
              className="inline-flex items-center gap-2 bg-white hover:bg-brand-cream text-brand-amber font-body font-bold text-lg px-10 py-4 rounded-lg transition-colors shadow-xl"
            >
              Get the Guide &mdash; ${SITE.price}
            </a>
            <p className="text-white/50 text-sm font-body mt-4">
              Instant PDF download. Prints beautifully on A4.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-brand-stone/50">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
          <AnimatedSection>
            <div className="text-center mb-10">
              <h2 className="font-display text-brand-navy text-3xl sm:text-4xl">
                Common questions
              </h2>
            </div>
          </AnimatedSection>
          <FaqSection />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-navy">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-10 sm:py-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <SunIcon className="text-brand-amber" />
              <span className="font-display text-white text-lg">
                {SITE.brandName}
              </span>
            </div>
            <p className="text-white/30 text-sm font-body text-center sm:text-right">
              This guide helps you make purchasing decisions. It is not
              electrical advice. Always consult a qualified electrician for
              installation.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
