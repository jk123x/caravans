"use client";

import { motion } from "framer-motion";
import type { QuizResult } from "@/lib/quiz-logic";
import { GuideUpsellBlock } from "@/components/guide-upsell-block";

function GoldDot() {
  return (
    <span className="flex-shrink-0 w-2 h-2 rounded-full bg-brand-gold mt-1.5" />
  );
}

const tierColors: Record<string, { bg: string; text: string }> = {
  weekender: { bg: "var(--color-brand-weekender)", text: "white" },
  tourer: { bg: "var(--color-brand-tourer)", text: "white" },
  fulltimer: { bg: "var(--color-brand-fulltimer)", text: "white" },
};

interface QuizResultViewProps {
  result: QuizResult;
}

export function QuizResultView({ result }: QuizResultViewProps) {
  const colors = tierColors[result.tier] || tierColors.weekender;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="space-y-8"
    >
      {/* Tier badge + headline */}
      <div className="text-center">
        <span
          className="inline-block px-4 py-1.5 rounded text-sm font-body font-semibold mb-4"
          style={{ backgroundColor: colors.bg, color: colors.text }}
        >
          {result.tierLabel}
        </span>
        <h2 className="font-display text-brand-slate text-3xl sm:text-4xl mb-3">
          {result.headline}
        </h2>
        <p className="font-body text-brand-muted text-lg leading-relaxed max-w-xl mx-auto">
          {result.copy}
        </p>
      </div>

      {/* Air con warning */}
      {result.hasAirCon && (
        <div className="border-l-4 border-brand-gold bg-white rounded-r-md px-5 py-4">
          <p className="font-body text-brand-body">
            <strong>Heads up about the air conditioning.</strong>{" "}
            Running air con off-grid needs a 48V lithium system with 1000W+ of solar. That's a major setup, usually $12,000+. The guide covers what this looks like in the Full-timer tier.
          </p>
        </div>
      )}

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-md p-4 text-center">
          <p className="font-display text-brand-slate text-xl sm:text-2xl">
            {result.dailyWh > 0 ? `${result.dailyWh.toLocaleString()}` : "---"}
          </p>
          <p className="font-body text-brand-muted text-xs mt-1">est. daily Wh</p>
        </div>
        <div className="bg-white rounded-md p-4 text-center">
          <p className="font-display text-brand-slate text-xl sm:text-2xl">{result.budget}</p>
          <p className="font-body text-brand-muted text-xs mt-1">system budget</p>
        </div>
        <div className="bg-white rounded-md p-4 text-center">
          <p className="font-display text-brand-slate text-xl sm:text-2xl">{result.sunHours}h</p>
          <p className="font-body text-brand-muted text-xs mt-1">avg sun hours</p>
        </div>
      </div>

      {/* System teaser — gate the specifics */}
      <div className="bg-white rounded-md p-6">
        <h3 className="font-display text-brand-slate text-xl mb-3">Your system needs {result.system.length} components</h3>
        <p className="font-body text-brand-muted text-[15px] leading-relaxed mb-4">
          We&apos;ve worked out the solar panel size, battery capacity, charge controller, and inverter specs for your setup — sized for Australian sun hours and conditions. The guide has your full component list with specific brand recommendations and a ready-to-use shopping list.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {["Solar panels", "Battery bank", "Charge controller", "DC-DC charger", "Inverter", "Battery monitor"].map((component) => (
            <div key={component} className="bg-brand-cream-light rounded px-3 py-2 text-center">
              <span className="font-body text-brand-muted text-sm">{component}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Personalised note — consolidated, points to guide */}
      {(result.existingSetupNote || result.concernNote) && (
        <div className="border-l-4 border-brand-gold bg-brand-cream-light rounded-r-md px-5 py-4">
          <p className="font-body text-brand-body text-[15px] leading-relaxed">
            {result.existingSetupNote || result.concernNote}
          </p>
        </div>
      )}

      {/* Guide upsell */}
      <GuideUpsellBlock />
    </motion.div>
  );
}
