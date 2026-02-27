import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Caravan Power Audit Worksheet | Caravan Solar",
  description:
    "Download the free power audit worksheet. Work out exactly how much solar your caravan needs before you spend a cent.",
};

export default function FreeGuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
