"use client";

import { motion } from "framer-motion";
import type { QuizQuestion } from "@/lib/quiz-logic";

interface QuizStepProps {
  question: QuizQuestion;
  value: number | number[];
  onSelect: (value: number | number[]) => void;
  onNext: () => void;
}

export function QuizStep({ question, value, onSelect, onNext }: QuizStepProps) {
  const isMulti = question.multiSelect;
  const selectedValues = isMulti ? (value as number[]) : [];
  const selectedSingle = isMulti ? -1 : (value as number);

  function toggleMulti(optValue: number) {
    const current = selectedValues;
    if (current.includes(optValue)) {
      onSelect(current.filter((v) => v !== optValue));
    } else {
      onSelect([...current, optValue]);
    }
  }

  function selectSingle(optValue: number) {
    onSelect(optValue);
    // Auto-advance on single select after a short delay
    setTimeout(onNext, 250);
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <h2 className="font-display text-brand-navy text-2xl sm:text-3xl mb-2">
        {question.title}
      </h2>
      {question.subtitle && (
        <p className="font-body text-brand-muted text-base mb-6">{question.subtitle}</p>
      )}
      {!question.subtitle && <div className="mb-6" />}

      <div className="space-y-3">
        {question.options.map((opt) => {
          const isSelected = isMulti
            ? selectedValues.includes(opt.value)
            : selectedSingle === opt.value;

          return (
            <button
              key={opt.value}
              onClick={() => isMulti ? toggleMulti(opt.value) : selectSingle(opt.value)}
              className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all cursor-pointer font-body text-base sm:text-lg ${
                isSelected
                  ? "border-brand-amber bg-brand-amber-pale text-brand-navy"
                  : "border-brand-stone bg-white text-brand-charcoal hover:border-brand-amber/40"
              }`}
            >
              <span className="flex items-center gap-3">
                <span
                  className={`flex-shrink-0 w-6 h-6 rounded-${isMulti ? "md" : "full"} border-2 flex items-center justify-center transition-colors ${
                    isSelected
                      ? "border-brand-amber bg-brand-amber"
                      : "border-brand-stone"
                  }`}
                >
                  {isSelected && (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M3 7l2.5 2.5L11 4"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
                {opt.label}
              </span>
            </button>
          );
        })}
      </div>

      {isMulti && (
        <div className="mt-6">
          <button
            onClick={onNext}
            disabled={selectedValues.length === 0}
            className="bg-brand-amber hover:bg-brand-amber-light disabled:opacity-40 text-white font-body font-semibold text-lg px-8 py-3.5 rounded-lg transition-colors cursor-pointer"
          >
            Continue
          </button>
        </div>
      )}
    </motion.div>
  );
}
