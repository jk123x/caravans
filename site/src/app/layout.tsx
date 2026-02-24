import type { Metadata } from "next";
import { Young_Serif, Outfit } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/config";

const youngSerif = Young_Serif({
  weight: "400",
  variable: "--font-young-serif",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${SITE.tagline} | ${SITE.brandName}`,
  description:
    "Stop guessing what solar setup your caravan needs. Clear recommendations, brand comparisons, shopping lists, and sizing worksheets. Made for Australian caravanners.",
  openGraph: {
    title: SITE.tagline,
    description:
      "The $49 guide that tells you exactly what to buy for your caravan solar setup. No jargon. No theory. Just clear recommendations.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${youngSerif.variable} ${outfit.variable}`}>
      <body>{children}</body>
    </html>
  );
}
