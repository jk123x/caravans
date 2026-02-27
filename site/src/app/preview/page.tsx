import { redirect } from "next/navigation";
import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { GuideRenderer } from "@/components/guide-renderer";

export const metadata: Metadata = {
  title: "Preview | Caravan Solar",
  robots: { index: false, follow: false },
};

const GUIDE_DIR = path.join(process.cwd(), "..", "guide-content");

const sections = [
  { file: "00-chapter-zero.md", label: "Chapter 0 (Free Download)" },
  { file: "01-quick-primer.md", label: "Section 1" },
  { file: "02-power-audit.md", label: "Section 2" },
  { file: "03-components.md", label: "Section 3" },
  { file: "04-brand-comparison.md", label: "Section 4" },
  { file: "05-system-sizing.md", label: "Section 5" },
  { file: "06-expensive-mistakes.md", label: "Section 6" },
  { file: "checklist-before-you-buy.md", label: "Checklist: Before You Buy" },
  { file: "checklist-installer-brief.md", label: "Checklist: Installer Brief" },
  { file: "checklist-first-week.md", label: "Checklist: First Week" },
  { file: "worksheet-power-audit.md", label: "Worksheet: Power Audit" },
  { file: "worksheet-system-sizing.md", label: "Worksheet: System Sizing" },
  { file: "worksheet-shopping-list.md", label: "Worksheet: Shopping List" },
];

export default function PreviewPage() {
  if (process.env.NODE_ENV === "production") {
    redirect("/");
  }

  const content = sections.map((s) => {
    const filePath = path.join(GUIDE_DIR, s.file);
    const md = fs.readFileSync(filePath, "utf-8");
    return { ...s, md };
  });

  return (
    <div className="min-h-screen bg-white">
      {/* TOC sidebar */}
      <nav className="fixed top-0 left-0 w-64 h-screen bg-brand-cream border-r border-brand-silver overflow-y-auto p-6 hidden lg:block z-50">
        <p className="font-display text-brand-slate text-lg mb-1">
          Guide Preview
        </p>
        <p className="text-brand-muted text-xs mb-6 font-body">
          Draft for review. Click to jump.
        </p>
        <ul className="space-y-2">
          {content.map((s) => (
            <li key={s.file}>
              <a
                href={`#${s.file}`}
                className="text-sm text-brand-body hover:text-brand-gold transition-colors font-body leading-snug block"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Content */}
      <main className="lg:ml-64">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 py-12">
          <div className="mb-12 pb-8 border-b border-brand-silver">
            <h1 className="font-display text-brand-slate text-3xl mb-2">
              The Beginner&apos;s Guide to Caravan Solar
            </h1>
            <p className="text-brand-muted font-body">
              Full draft for review. All sections + worksheets.
            </p>
          </div>

          {content.map((s) => (
            <article key={s.file} id={s.file} className="mb-16 scroll-mt-8">
              <div className="mb-6 pb-3 border-b-2 border-brand-gold/30">
                <span className="text-xs font-body font-semibold text-brand-gold uppercase tracking-wider">
                  {s.label}
                </span>
              </div>
              <GuideRenderer content={s.md} />
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
