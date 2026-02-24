"use client";

import { motion } from "framer-motion";

export function GuideMockup() {
  return (
    <div className="relative w-[320px] h-[420px] sm:w-[360px] sm:h-[470px]">
      {/* Back pages - worksheets peeking out */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="absolute top-3 left-4 w-[85%] h-[90%] rounded-sm bg-white border border-brand-stone shadow-sm"
        style={{ transform: "rotate(3deg)" }}
      >
        <div className="p-5 pt-6 space-y-3 opacity-60">
          <div className="h-3 w-3/4 rounded bg-brand-stone" />
          <div className="h-3 w-1/2 rounded bg-brand-stone" />
          <div className="mt-4 space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex gap-2 items-center">
                <div className="w-4 h-4 rounded border-2 border-brand-stone flex-shrink-0" />
                <div className="h-2.5 rounded bg-brand-stone" style={{ width: `${50 + Math.random() * 40}%` }} />
                <div className="h-2.5 w-12 rounded bg-brand-amber-pale flex-shrink-0" />
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-1.5">
            <div className="h-2 w-full rounded bg-brand-stone" />
            <div className="h-2 w-5/6 rounded bg-brand-stone" />
            <div className="h-2 w-3/4 rounded bg-brand-stone" />
          </div>
        </div>
      </motion.div>

      {/* Middle page */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="absolute top-1.5 left-2 w-[85%] h-[90%] rounded-sm bg-white border border-brand-stone shadow-md"
        style={{ transform: "rotate(1.5deg)" }}
      >
        <div className="p-5 pt-6 space-y-2.5 opacity-50">
          <div className="h-3.5 w-2/3 rounded bg-brand-stone" />
          <div className="grid grid-cols-4 gap-1.5 mt-3">
            {Array.from({ length: 16 }).map((_, i) => (
              <div
                key={i}
                className="h-5 rounded"
                style={{
                  backgroundColor: i < 4 ? "var(--color-brand-navy)" : "var(--color-brand-stone)",
                  opacity: i < 4 ? 0.15 : 0.7,
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
        style={{
          background: "linear-gradient(145deg, var(--color-brand-navy) 0%, var(--color-brand-navy-light) 100%)",
        }}
      >
        {/* Subtle texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative h-full flex flex-col justify-between p-6 sm:p-8">
          {/* Top accent line */}
          <div className="w-12 h-1 rounded-full bg-brand-amber" />

          {/* Title block */}
          <div className="space-y-3">
            <p className="text-brand-amber text-xs sm:text-sm font-medium tracking-widest uppercase font-body">
              The Beginner&apos;s Guide to
            </p>
            <h3 className="font-display text-white text-2xl sm:text-3xl leading-tight">
              Caravan
              <br />
              Solar
            </h3>
            <div className="w-8 h-0.5 bg-brand-amber/40" />
            <p className="text-white/60 text-xs sm:text-sm font-body leading-relaxed">
              Decision-making tool for
              <br />
              Australian caravanners
            </p>
          </div>

          {/* Bottom section */}
          <div className="space-y-3">
            {/* Sun icon */}
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              className="text-brand-amber opacity-60"
            >
              <circle cx="18" cy="18" r="7" stroke="currentColor" strokeWidth="1.5" />
              <path
                d="M18 4v4M18 28v4M4 18h4M28 18h4M8.1 8.1l2.83 2.83M25.07 25.07l2.83 2.83M8.1 27.9l2.83-2.83M25.07 10.93l2.83-2.83"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>

            <div className="flex items-end justify-between">
              <p className="text-white/40 text-[10px] tracking-wider uppercase font-body">
                PDF Guide + Worksheets
              </p>
              <p className="text-brand-amber text-lg font-display">$49</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
