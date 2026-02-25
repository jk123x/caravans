"use client";

import { useState, useCallback, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { SITE } from "@/lib/config";
import {
  questions,
  calculateResult,
  getQuizTags,
  type QuizAnswers,
} from "@/lib/quiz-logic";
import { QuizProgress } from "@/components/quiz-progress";
import { QuizStep } from "@/components/quiz-step";
import { QuizResultView } from "@/components/quiz-result";
import { EmailCaptureForm } from "@/components/email-capture-form";
import { trackQuizStart, trackQuizComplete } from "@/lib/pixel";

function SunIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className={className}>
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

type Step = "quiz" | "email" | "result";

const defaultAnswers: QuizAnswers = {
  q1: -1,
  q2: -1,
  q3: -1,
  q4: [],
  q5: -1,
  q6: -1,
  q7: -1,
  q8: [],
};

export default function QuizPage() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({ ...defaultAnswers });
  const [step, setStep] = useState<Step>("quiz");
  const quizStartedRef = useRef(false);

  const question = questions[currentQ];

  const handleSelect = useCallback(
    (value: number | number[]) => {
      // Fire QuizStart on first interaction
      if (!quizStartedRef.current) {
        quizStartedRef.current = true;
        trackQuizStart();
      }

      setAnswers((prev) => ({
        ...prev,
        [question.id]: value,
      }));
    },
    [question.id]
  );

  const handleNext = useCallback(() => {
    if (currentQ < questions.length - 1) {
      setCurrentQ((prev) => prev + 1);
    } else {
      // All questions done
      trackQuizComplete();
      setStep("email");
    }
  }, [currentQ]);

  const handleBack = useCallback(() => {
    if (currentQ > 0) {
      setCurrentQ((prev) => prev - 1);
    }
  }, [currentQ]);

  const handleEmailSuccess = useCallback(() => {
    setStep("result");
  }, []);

  const handleSkipEmail = useCallback(() => {
    setStep("result");
  }, []);

  const result = step === "result" ? calculateResult(answers) : null;
  const tags = step === "email" ? getQuizTags(answers) : [];

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-brand-cream/90 backdrop-blur-md border-b border-brand-stone/60">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <SunIcon className="text-brand-amber" />
            <span className="font-display text-brand-navy text-lg">{SITE.brandName}</span>
          </a>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-5 sm:px-8 py-8 sm:py-14">
        {/* Quiz questions */}
        {step === "quiz" && (
          <>
            <QuizProgress current={currentQ} total={questions.length} />
            <div className="mt-8">
              <AnimatePresence mode="wait">
                <QuizStep
                  key={question.id}
                  question={question}
                  value={answers[question.id]}
                  onSelect={handleSelect}
                  onNext={handleNext}
                />
              </AnimatePresence>
            </div>

            {/* Back button */}
            {currentQ > 0 && (
              <button
                onClick={handleBack}
                className="mt-6 font-body text-brand-muted hover:text-brand-charcoal text-sm transition-colors cursor-pointer"
              >
                &larr; Back
              </button>
            )}
          </>
        )}

        {/* Email capture */}
        {step === "email" && (
          <div className="max-w-md mx-auto text-center">
            <h2 className="font-display text-brand-navy text-2xl sm:text-3xl mb-3">
              Your recommendation is ready
            </h2>
            <p className="font-body text-brand-muted text-base mb-8">
              Pop in your email and we'll send you a copy of your results.
            </p>
            <EmailCaptureForm
              formId={SITE.kitFormIds.quiz}
              tags={tags}
              buttonText="See My Recommendation"
              subtext="We'll send you a copy. No spam, unsubscribe anytime."
              onSuccess={handleEmailSuccess}
            />
            <button
              onClick={handleSkipEmail}
              className="mt-4 font-body text-brand-muted hover:text-brand-charcoal text-sm underline underline-offset-2 transition-colors cursor-pointer"
            >
              Skip and see my results
            </button>
          </div>
        )}

        {/* Results */}
        {step === "result" && result && <QuizResultView result={result} />}
      </div>
    </div>
  );
}
