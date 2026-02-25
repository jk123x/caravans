import type { Metadata } from "next";
import { Young_Serif, Outfit } from "next/font/google";
import Script from "next/script";
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
      <body>
        {children}

        {/* Plausible Analytics */}
        {SITE.plausibleDomain && (
          <Script
            defer
            data-domain={SITE.plausibleDomain}
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        )}

        {/* Meta Pixel */}
        {SITE.metaPixelId && (
          <>
            <Script id="meta-pixel" strategy="afterInteractive">
              {`
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${SITE.metaPixelId}');
                fbq('track', 'PageView');
              `}
            </Script>
            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: "none" }}
                src={`https://www.facebook.com/tr?id=${SITE.metaPixelId}&ev=PageView&noscript=1`}
                alt=""
              />
            </noscript>
          </>
        )}
      </body>
    </html>
  );
}
