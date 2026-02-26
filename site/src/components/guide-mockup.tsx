"use client";

import { motion } from "framer-motion";

export function GuideMockup() {
  return (
    <div className="relative w-[300px] h-[400px] sm:w-[340px] sm:h-[450px]">
      {/* Back page — worksheet peek */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="absolute top-3 left-4 w-[85%] h-[90%] rounded-sm bg-brand-cream-light"
        style={{ transform: "rotate(3deg)", border: "1px solid var(--color-brand-silver)" }}
      >
        <div className="p-5 pt-6 space-y-3 opacity-50">
          <div className="h-3 w-3/4 rounded bg-brand-silver" />
          <div className="h-3 w-1/2 rounded bg-brand-silver" />
          <div className="mt-4 space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex gap-2 items-center">
                <div className="w-4 h-4 rounded border-2 border-brand-silver flex-shrink-0" />
                <div className="h-2.5 rounded bg-brand-silver" style={{ width: `${50 + i * 8}%` }} />
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Middle page */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="absolute top-1.5 left-2 w-[85%] h-[90%] rounded-sm bg-brand-cream"
        style={{ transform: "rotate(1.5deg)", border: "1px solid var(--color-brand-silver)" }}
      >
        <div className="p-5 pt-6 space-y-2.5 opacity-40">
          <div className="h-3.5 w-2/3 rounded bg-brand-silver" />
          <div className="grid grid-cols-4 gap-1.5 mt-3">
            {Array.from({ length: 16 }).map((_, i) => (
              <div
                key={i}
                className="h-5 rounded"
                style={{
                  backgroundColor: i < 4 ? "var(--color-brand-slate)" : "var(--color-brand-silver)",
                  opacity: i < 4 ? 0.15 : 0.6,
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Cover */}
      <motion.div
        initial={{ opacity: 0, y: 30, rotate: -2 }}
        animate={{ opacity: 1, y: 0, rotate: -1 }}
        transition={{ delay: 0.1, duration: 0.7, ease: "easeOut" }}
        className="absolute top-0 left-0 w-[85%] h-[90%] rounded-sm overflow-hidden shadow-xl"
      >
        {/* Top: slate header zone (~55%) */}
        <div className="relative bg-brand-slate h-[55%] flex flex-col justify-between p-6 sm:p-7">
          {/* Gold accent bar */}
          <div className="absolute top-0 left-0 right-0 h-[5px] bg-brand-gold" />

          <div className="pt-2">
            <p className="label-caps text-[10px] sm:text-[11px] tracking-[2.5px]">
              The Beginner&apos;s Guide to
            </p>
          </div>

          <div>
            <h3 className="font-display text-white text-[1.7rem] sm:text-[2rem] font-bold leading-[1.1] mb-3">
              Caravan
              <br />
              Solar
            </h3>
            <div className="w-8 h-[3px] bg-brand-gold mb-3" />
            <p className="text-white/60 text-xs sm:text-[13px] font-body leading-relaxed">
              Decision-making tool for
              <br />
              Australian caravanners
            </p>
          </div>
        </div>

        {/* Bottom: cream zone (~45%) */}
        <div className="relative bg-brand-cream h-[45%] p-6 sm:p-7 flex flex-col justify-between">
          <div>
            <p className="label-caps text-[9px] tracking-[2px] mb-3">
              What&apos;s Inside
            </p>
            <div className="space-y-1.5">
              {["Power audit worksheet", "Brand comparisons", "Shopping lists"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold flex-shrink-0" />
                  <span className="text-brand-body text-[10px] sm:text-[11px] font-body">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className="inline-block px-2 py-0.5 rounded text-[8px] font-body font-semibold text-white"
              style={{ backgroundColor: "var(--color-brand-weekender)" }}
            >
              Weekender
            </span>
            <span
              className="inline-block px-2 py-0.5 rounded text-[8px] font-body font-semibold text-white"
              style={{ backgroundColor: "var(--color-brand-tourer)" }}
            >
              Tourer
            </span>
            <span
              className="inline-block px-2 py-0.5 rounded text-[8px] font-body font-semibold text-white"
              style={{ backgroundColor: "var(--color-brand-fulltimer)" }}
            >
              Full-timer
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
