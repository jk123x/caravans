import Script from "next/script";
import Link from "next/link";
import { SITE } from "@/lib/config";
import { GuideMockup } from "@/components/guide-mockup";
import { FaqSection } from "@/components/faq-section";
import { AnimatedSection } from "@/components/animated-section";

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "I know nothing about solar. Is this guide really for beginners?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "That's exactly who it's for. You don't need to understand electricity or have any technical background. The guide explains every concept in plain language and walks you through each decision step by step. If you can follow a recipe, you can follow this guide.",
      },
    },
    {
      "@type": "Question",
      name: "Will this tell me how to install the system myself?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. This guide helps you decide what to buy and how to size your system correctly. It's a decision-making tool, not an installation manual. Once you know exactly what you need, you can either hire a qualified installer (you'll know exactly what to brief them on) or follow manufacturer installation guides with confidence.",
      },
    },
    {
      "@type": "Question",
      name: "I already have a basic solar setup. Is this still useful?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If your current setup isn't keeping up, this guide will help you figure out exactly what's undersized and what to upgrade. The power audit worksheet and system sizing tools work whether you're starting from scratch or upgrading an existing system.",
      },
    },
    {
      "@type": "Question",
      name: "Why $49? Can't I find this information for free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can find pieces of it across hundreds of forum posts, YouTube videos, and brand-specific guides that are trying to sell you their products. This guide saves you weeks of research and gives you brand-neutral recommendations, ready-to-use shopping lists, and sizing worksheets all in one place. It's less than the cost of a single solar panel.",
      },
    },
    {
      "@type": "Question",
      name: "Is this Australian-specific?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Australian sun hours, Australian brands (REDARC, Enerdrive, Victron, Renogy), Australian retailers, and Australian electrical standards. The system sizing accounts for conditions across different parts of Australia.",
      },
    },
  ],
};

const productStructuredData = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "The Beginner's Guide to Caravan Solar",
  description:
    "Clear recommendations, brand comparisons, shopping lists, and sizing worksheets for Australian caravanners. Covers weekender, tourer, and full-timer setups.",
  offers: {
    "@type": "Offer",
    price: "49",
    priceCurrency: "AUD",
    availability: "https://schema.org/InStock",
    url: "https://caravansolar.au",
  },
};

const features = [
  {
    num: "01",
    title: "Power Audit Worksheet",
    desc: "Figure out exactly how much power your setup uses each day. Pre-filled examples for common caravan setups so you're not starting from scratch.",
  },
  {
    num: "02",
    title: "Component Guide",
    desc: "Batteries, panels, controllers, inverters, DC-DC chargers. What each one does in plain English, what to buy, and what to skip.",
  },
  {
    num: "03",
    title: "Brand Comparisons",
    desc: "REDARC vs Victron vs Enerdrive vs Renogy. Side-by-side comparison with clear recommendations for different budgets and use cases.",
  },
  {
    num: "04",
    title: "Shopping Lists by Tier",
    desc: "Ready-to-use lists for weekenders ($1,500), tourers ($3,000-$5,000), and full-timers ($5,000-$8,000+). Take it to the shop.",
  },
  {
    num: "05",
    title: "System Sizing Worksheets",
    desc: "Use your power audit numbers to calculate exactly what battery, solar, controller, and inverter specs you need. No guessing.",
  },
  {
    num: "06",
    title: "Expensive Mistakes Guide",
    desc: "The 7 mistakes that cost people $500 to $2,000. What each one costs, why people make it, and how to avoid every one of them.",
  },
];

const tiers = [
  {
    name: "Weekender",
    color: "brand-weekender",
    desc: "Lights, phone charging, fridge. A few nights at a time.",
    specs: ["200W solar", "100-200Ah lithium", "1000W inverter or none"],
    cost: "$1,500 - $2,500",
  },
  {
    name: "Tourer",
    color: "brand-tourer",
    desc: "Fridge, TV, laptops, lights. Weeks on the road, mix of parks and free camping.",
    specs: [
      "300-400W solar + portable",
      "200-300Ah lithium",
      "2000W inverter",
    ],
    cost: "$3,000 - $5,000",
  },
  {
    name: "Full-timer",
    color: "brand-fulltimer",
    desc: "Everything above plus microwave, coffee machine, hair dryer. Living on the road full time.",
    specs: [
      "400-600W solar + portable",
      "300-400Ah lithium",
      "3000W inverter",
    ],
    cost: "$5,000 - $8,000+",
  },
];

function GoldDot() {
  return (
    <span className="flex-shrink-0 w-2 h-2 rounded-full bg-brand-gold mt-2" />
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-brand-cream/90 backdrop-blur-md border-b border-brand-silver/60">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <span className="font-display text-brand-slate text-lg">
            {SITE.brandName}
          </span>
          <a
            href={SITE.checkoutUrl}
            className="hidden sm:inline-flex items-center gap-2 bg-brand-gold hover:bg-brand-gold/90 text-white font-body font-semibold text-sm px-5 py-2.5 rounded transition-colors"
          >
            Get the Guide — ${SITE.price}
          </a>
        </div>
      </nav>

      {/* Hero — full-bleed slate band */}
      <section className="relative bg-brand-slate overflow-hidden">
        {/* Gold accent bar at top */}
        <div className="absolute top-0 left-0 right-0 h-[5px] bg-brand-gold" />

        <div className="max-w-5xl mx-auto px-5 sm:px-8 pt-16 sm:pt-24 pb-16 sm:pb-20">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Text */}
            <div className="flex-1 text-center lg:text-left">
              <AnimatedSection delay={0}>
                <p className="label-caps mb-4">
                  The Beginner&apos;s Guide to
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <h1 className="font-display text-white text-4xl sm:text-5xl lg:text-[3.8rem] font-bold leading-[1.1] mb-5">
                  Caravan
                  <br />
                  Solar
                </h1>
              </AnimatedSection>

              <AnimatedSection delay={0.15}>
                <div className="w-12 h-1 bg-brand-gold mb-5 mx-auto lg:mx-0" />
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <p className="font-body text-white/70 text-lg sm:text-xl leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                  Clear recommendations, brand comparisons, and ready-to-use
                  shopping lists. No jargon. No theory. No trying to sell you a
                  specific brand.
                </p>
              </AnimatedSection>
            </div>

            {/* Mockup */}
            <div className="flex-shrink-0">
              <GuideMockup />
            </div>
          </div>
        </div>
      </section>

      {/* CTA strip below hero — on cream */}
      <section className="bg-brand-cream">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-8 sm:py-10">
          <AnimatedSection delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
              <a
                href={SITE.checkoutUrl}
                className="inline-flex items-center gap-2 bg-brand-gold hover:bg-brand-gold/90 text-white font-body font-semibold text-lg px-8 py-4 rounded transition-colors"
              >
                Get the Guide — ${SITE.price}
              </a>
              <p className="text-brand-muted text-sm font-body">
                PDF download. Prints on A4.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mt-4">
              <Link
                href={SITE.quizUrl}
                className="inline-flex items-center gap-1.5 text-brand-gold hover:text-brand-gold/80 font-body font-semibold text-base transition-colors"
              >
                Not sure what you need? Take the quiz →
              </Link>
              <Link
                href="/free-guide"
                className="inline-flex items-center gap-1.5 text-brand-gold/70 hover:text-brand-gold font-body text-sm transition-colors"
              >
                Or grab the free power audit worksheet
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-brand-slate">
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
                $3K – $10K
              </p>
              <p className="text-white/50 font-body text-sm mt-1">
                typical solar system spend
              </p>
            </div>
            <div>
              <p className="font-display text-brand-gold text-2xl sm:text-3xl">
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
            <h2 className="font-display text-brand-slate text-3xl sm:text-4xl leading-snug mb-6">
              You&apos;re about to spend thousands on solar components
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <p className="font-body text-brand-muted text-lg sm:text-xl leading-relaxed mb-8">
              The difference between getting it right and getting it wrong?
              About <strong className="text-brand-body">$500 to $2,000</strong> in
              wasted money, plus a system that doesn&apos;t actually do what you
              need.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            {/* Gold left-bar callout */}
            <div className="border-l-4 border-brand-gold bg-white rounded-r-md px-6 py-5 text-left">
              <p className="font-body text-brand-body leading-relaxed">
                Everyone says &ldquo;do your research.&rdquo; But the research is
                scattered across hundreds of forum posts, YouTube videos, and brand
                websites that are really just trying to sell you their gear. This
                guide pulls it all together in one place, with recommendations that
                aren&apos;t tied to any brand.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* What's Inside */}
      <section className="bg-brand-cream-light">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
          <AnimatedSection>
            <div className="text-center mb-12">
              <p className="label-caps mb-3">
                What&apos;s inside
              </p>
              <h2 className="font-display text-brand-slate text-3xl sm:text-4xl">
                Everything you need to decide and buy
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {features.map((f, i) => (
              <AnimatedSection key={f.title} delay={i * 0.07}>
                <div className="bg-white rounded-md p-6 h-full">
                  <span className="font-display text-brand-gold text-2xl font-bold">
                    {f.num}
                  </span>
                  <h3 className="font-display text-brand-slate text-xl mt-3 mb-2">
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
              <p className="label-caps mb-3">
                Three system tiers
              </p>
              <h2 className="font-display text-brand-slate text-3xl sm:text-4xl mb-4">
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
                <div className="bg-white rounded-md p-6 h-full">
                  {/* Tier badge */}
                  <span
                    className="inline-block px-3 py-1 rounded text-sm font-body font-semibold mb-4"
                    style={{
                      backgroundColor: `var(--color-${tier.color})`,
                      opacity: 1,
                      color: 'white',
                    }}
                  >
                    {tier.name}
                  </span>
                  <p className="font-body text-brand-muted text-sm mb-5 leading-relaxed">
                    {tier.desc}
                  </p>
                  <ul className="space-y-2.5 mb-6">
                    {tier.specs.map((spec) => (
                      <li key={spec} className="flex items-start gap-2.5">
                        <GoldDot />
                        <span className="font-body text-brand-body text-sm">
                          {spec}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 border-t border-brand-silver/50">
                    <p
                      className="font-display text-xl"
                      style={{ color: `var(--color-${tier.color})` }}
                    >
                      {tier.cost}
                    </p>
                    <p className="font-body text-brand-muted text-xs mt-0.5">
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
      <section className="bg-brand-slate">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 py-16 sm:py-20 text-center">
          <AnimatedSection>
            <h2 className="font-display text-white text-3xl sm:text-4xl mb-4">
              Less than the cost of one solar panel
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <p className="font-body text-white/70 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
              For ${SITE.price}, you get the complete guide with worksheets,
              brand comparisons, shopping lists, and system sizing tools. One bad
              purchasing decision costs 10–40x more than this guide.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            {/* Gold left-bar checklist */}
            <div className="border-l-4 border-brand-gold bg-white/10 rounded-r-md px-6 py-5 mb-8 max-w-md mx-auto text-left">
              <p className="label-caps text-brand-gold mb-4">What you get</p>
              <ul className="space-y-3">
                {[
                  "Complete PDF guide (~30 pages)",
                  "Power Audit Worksheet",
                  "System Sizing Worksheet",
                  "Brand comparison tables",
                  "Shopping lists for all 3 tiers",
                  "Expensive mistakes breakdown",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <GoldDot />
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
              className="inline-flex items-center gap-2 bg-brand-gold hover:bg-brand-gold/90 text-white font-body font-bold text-lg px-10 py-4 rounded transition-colors"
            >
              Get the Guide — ${SITE.price}
            </a>
            <p className="text-white/40 text-sm font-body mt-4">
              Instant PDF download. Prints beautifully on A4.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-brand-cream-light">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
          <AnimatedSection>
            <div className="text-center mb-10">
              <p className="label-caps mb-3">FAQ</p>
              <h2 className="font-display text-brand-slate text-3xl sm:text-4xl">
                Common questions
              </h2>
            </div>
          </AnimatedSection>
          <FaqSection />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-cream border-t border-brand-silver">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-10 sm:py-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="font-display text-brand-slate text-lg">
              {SITE.brandName}
            </span>
            <nav className="flex items-center gap-5">
              <Link href="/quiz" className="font-body text-brand-muted hover:text-brand-body text-sm transition-colors">
                Solar Quiz
              </Link>
              <Link href="/free-guide" className="font-body text-brand-muted hover:text-brand-body text-sm transition-colors">
                Free Power Audit
              </Link>
            </nav>
          </div>
          <p className="text-brand-muted/60 text-xs font-body text-center mt-6">
            This guide helps you make purchasing decisions. It is not
            electrical advice. Always consult a qualified electrician for
            installation.
          </p>
        </div>
      </footer>

      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <Script
        id="product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productStructuredData) }}
      />
    </div>
  );
}
