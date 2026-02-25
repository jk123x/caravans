export const SITE = {
  brandName: "Caravan Solar",
  tagline: "The Beginner's Guide to Caravan Solar",
  price: 49,
  currency: "AUD",
  checkoutUrl: "#", // Stripe Payment Link goes here
  quizUrl: "/quiz",
  chapter0DownloadUrl: "/downloads/caravan-solar-chapter-0.pdf",
  metaPixelId: "", // from FB Business Manager
  plausibleDomain: "caravansolar.au",
  kitFormIds: {
    quiz: "", // from Kit
    chapter0: "", // from Kit
  },
} as const;
