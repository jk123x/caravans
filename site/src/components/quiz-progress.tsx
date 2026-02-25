"use client";

import { motion } from "framer-motion";

interface QuizProgressProps {
  current: number;
  total: number;
}

export function QuizProgress({ current, total }: QuizProgressProps) {
  const pct = ((current + 1) / total) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between items-baseline mb-2">
        <p className="font-body text-brand-muted text-sm">
          Question {current + 1} of {total}
        </p>
      </div>
      <div className="h-1.5 bg-brand-stone rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-brand-amber rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
