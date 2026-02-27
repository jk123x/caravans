declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function fbq(...args: unknown[]) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq(...args);
  }
}

export function trackPageView() {
  fbq("track", "PageView");
}

export function trackQuizStart() {
  fbq("track", "QuizStart");
}

export function trackQuizComplete() {
  fbq("track", "QuizComplete");
}

export function trackLead() {
  fbq("track", "Lead");
}

export function trackPurchase() {
  fbq("track", "Purchase", { currency: "AUD", value: 49 });
}
