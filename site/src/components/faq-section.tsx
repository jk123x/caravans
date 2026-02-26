"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "I know nothing about solar. Is this guide really for beginners?",
    a: "That's exactly who it's for. You don't need to understand electricity or have any technical background. The guide explains every concept in plain language and walks you through each decision step by step. If you can follow a recipe, you can follow this guide.",
  },
  {
    q: "Will this tell me how to install the system myself?",
    a: "No. This guide helps you decide what to buy and how to size your system correctly. It's a decision-making tool, not an installation manual. Once you know exactly what you need, you can either hire a qualified installer (you'll know exactly what to brief them on) or follow manufacturer installation guides with confidence.",
  },
  {
    q: "I already have a basic solar setup. Is this still useful?",
    a: "If your current setup isn't keeping up, this guide will help you figure out exactly what's undersized and what to upgrade. The power audit worksheet and system sizing tools work whether you're starting from scratch or upgrading an existing system.",
  },
  {
    q: "Why $49? Can't I find this information for free?",
    a: "You can find pieces of it across hundreds of forum posts, YouTube videos, and brand-specific guides that are trying to sell you their products. This guide saves you weeks of research and gives you brand-neutral recommendations, ready-to-use shopping lists, and sizing worksheets all in one place. It's less than the cost of a single solar panel.",
  },
  {
    q: "Is this Australian-specific?",
    a: "Yes. Australian sun hours, Australian brands (REDARC, Enerdrive, Victron, Renogy), Australian retailers, and Australian electrical standards. The system sizing accounts for conditions across different parts of Australia.",
  },
];

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="max-w-2xl mx-auto divide-y divide-brand-silver/60">
      {faqs.map((faq, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full text-left px-1 py-5 flex items-start justify-between gap-4 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <span className="font-body text-brand-slate font-semibold text-base sm:text-lg leading-snug">
              {faq.q}
            </span>
            <motion.span
              animate={{ rotate: open === i ? 45 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-brand-gold text-2xl leading-none flex-shrink-0 mt-0.5"
            >
              +
            </motion.span>
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <p className="px-1 pb-5 text-brand-muted leading-relaxed text-[15px]">
                  {faq.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
