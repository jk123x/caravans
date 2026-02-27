import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Caravan Solar Quiz — What Setup Do You Need? | Caravan Solar",
  description:
    "Take a 2-minute quiz to find out exactly what solar system your caravan needs. Personalised recommendations for Australian caravanners.",
};

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
