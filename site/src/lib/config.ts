export const SITE = {
  brandName: "Caravan Solar",
  tagline: "The Beginner's Guide to Caravan Solar",
  price: 49,
  currency: "AUD",
  checkoutUrl: "https://buy.stripe.com/fZu8wO5QH6HRelKdfDeME00",
  quizUrl: "/quiz",
  chapter0DownloadUrl: "/downloads/caravan-solar-chapter-0.pdf",
  guideDownloadUrl: "/api/download",
  metaPixelId: "2399648783813528",
  plausibleDomain: "caravansolar.au",
  kitFormIds: {
    quiz: "9141411",
    chapter0: "9141413",
    purchase: "9150036",
  },
  kitFormTags: {
    "9141411": {
      allowed: /^(source:quiz|tier:(weekender|tourer|fulltimer)|concern:(wasting-money|not-enough-power|wiring|overwhelmed))$/,
    },
    "9141413": {
      fixed: ["source:chapter0"],
    },
  } as Record<string, { allowed?: RegExp; fixed?: string[] }>,
} as const;
