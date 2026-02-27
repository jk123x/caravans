import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Download Your Guide | Caravan Solar",
  robots: { index: false, follow: true },
};

export default function SuccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
