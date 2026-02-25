"use client";

import { motion } from "framer-motion";
import type { QuizResult } from "@/lib/quiz-logic";
import { GuideUpsellBlock } from "@/components/guide-upsell-block";

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-brand-amber flex-shrink-0 mt-0.5">
      <path d="M4 9l3.5 3.5L14 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const tierColors: Record<string, string> = {
  weekender: "bg-emerald-600",
  tourer: "bg-sky-600",
  fulltimer: "bg-orange-600",
};

interface QuizResultViewProps {
  result: QuizResult;
}

export function QuizResultView({ result }: QuizResultViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="space-y-8"
    >
      {/* Tier badge + headline */}
      <div className="text-center">
        <span className={`inline-block px-4 py-1.5 rounded-full text-white font-body font-semibold text-sm mb-4 ${tierColors[result.tier]}`}>
          {result.tierLabel}
        </span>
        <h2 className="font-display text-brand-navy text-3xl sm:text-4xl mb-3">
          {result.headline}
        </h2>
        <p className="font-body text-brand-muted text-lg leading-relaxed max-w-xl mx-auto">
          {result.copy}
        </p>
      </div>

      {/* Air con warning */}
      {result.hasAirCon && (
        <div className="bg-brand-amber-pale border border-brand-amber/30 rounded-xl p-5">
          <p className="font-body text-brand-charcoal font-medium">
            <strong>Heads up about the air conditioning.</strong>{" "}
            Running air con off-grid needs a 48V lithium system with 1000W+ of solar. That's a major setup, usually $12,000+. The guide covers what this looks like in the Full-timer tier.
          </p>
        </div>
      )}

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-brand-stone p-4 text-center">
          <p className="font-display text-brand-navy text-xl sm:text-2xl">
            {result.dailyWh > 0 ? `${result.dailyWh.toLocaleString()}` : "---"}
          </p>
          <p className="font-body text-brand-muted text-xs mt-1">est. daily Wh</p>
        </div>
        <div className="bg-white rounded-xl border border-brand-stone p-4 text-center">
          <p className="font-display text-brand-navy text-xl sm:text-2xl">{result.budget}</p>
          <p className="font-body text-brand-muted text-xs mt-1">system budget</p>
        </div>
        <div className="bg-white rounded-xl border border-brand-stone p-4 text-center">
          <p className="font-display text-brand-navy text-xl sm:text-2xl">{result.sunHours}h</p>
          <p className="font-body text-brand-muted text-xs mt-1">avg sun hours</p>
        </div>
      </div>

      {/* System recommendation */}
      <div className="bg-white rounded-xl border border-brand-stone p-6">
        <h3 className="font-display text-brand-navy text-xl mb-4">Your recommended system</h3>
        <ul className="space-y-2.5">
          {result.system.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <CheckIcon />
              <span className="font-body text-brand-charcoal text-[15px]">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Personalised notes */}
      <div className="space-y-4">
        {result.existingSetupNote && (
          <div className="bg-brand-cream rounded-xl p-5">
            <p className="font-body text-brand-charcoal text-[15px] leading-relaxed">{result.existingSetupNote}</p>
          </div>
        )}
        {result.concernNote && (
          <div className="bg-brand-cream rounded-xl p-5">
            <p className="font-body text-brand-charcoal text-[15px] leading-relaxed">{result.concernNote}</p>
          </div>
        )}
        {result.budgetNote && (
          <div className="bg-brand-cream rounded-xl p-5">
            <p className="font-body text-brand-charcoal text-[15px] leading-relaxed">{result.budgetNote}</p>
          </div>
        )}
      </div>

      {/* Guide upsell */}
      <GuideUpsellBlock />
    </motion.div>
  );
}
