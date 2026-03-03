"use client";

import { useState } from "react";
import { trackLead } from "@/lib/pixel";

interface EmailCaptureFormProps {
  formId: string;
  tags?: string[];
  buttonText?: string;
  subtext?: string;
  onSuccess?: () => void;
}

export function EmailCaptureForm({
  formId,
  tags,
  buttonText = "Send it to me",
  subtext = "No spam, unsubscribe anytime.",
  onSuccess,
}: EmailCaptureFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, formId, tags }),
      });

      if (!res.ok) throw new Error("Subscribe failed");

      setStatus("success");
      trackLead();
      onSuccess?.();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-4">
        <p className="font-display text-brand-slate text-xl">You're in!</p>
        <p className="font-body text-brand-muted text-sm mt-1">Check below for your next step.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="email"
        required
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-3 rounded border border-brand-silver bg-white font-body text-brand-body placeholder:text-brand-muted/50 focus:outline-none focus:ring-2 focus:ring-brand-gold/40 focus:border-brand-gold transition-colors"
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full bg-brand-gold hover:bg-brand-gold/90 disabled:opacity-60 text-white font-body font-semibold text-lg px-6 py-3.5 rounded transition-colors cursor-pointer"
      >
        {status === "submitting" ? "Sending..." : buttonText}
      </button>
      {status === "error" && (
        <p className="text-brand-red text-sm font-body text-center">
          Something went wrong. Try again?
        </p>
      )}
      {subtext && (
        <p className="text-brand-muted text-xs font-body text-center">{subtext}</p>
      )}
    </form>
  );
}
