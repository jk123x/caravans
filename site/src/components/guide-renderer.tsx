"use client";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function GuideRenderer({ content }: { content: string }) {
  return (
    <div className="prose-guide">
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="font-display text-brand-slate text-2xl sm:text-3xl mt-10 mb-4 leading-snug">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="font-display text-brand-slate text-xl sm:text-2xl mt-10 mb-3 leading-snug">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="font-display text-brand-slate text-lg sm:text-xl mt-8 mb-2 leading-snug">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="font-body text-brand-body text-base leading-[1.8] mb-4">
              {children}
            </p>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-brand-slate">
              {children}
            </strong>
          ),
          ul: ({ children }) => (
            <ul className="font-body text-brand-body text-base leading-[1.8] mb-4 ml-5 list-disc space-y-1">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="font-body text-brand-body text-base leading-[1.8] mb-4 ml-5 list-decimal space-y-1">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="pl-1">{children}</li>,
          table: ({ children }) => (
            <div className="overflow-x-auto mb-6 rounded-md">
              <table className="w-full text-sm font-body">{children}</table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-brand-slate text-white">{children}</thead>
          ),
          th: ({ children }) => (
            <th className="text-left px-4 py-2.5 font-semibold text-sm">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-2.5 border-t border-brand-silver text-brand-body">
              {children}
            </td>
          ),
          hr: () => (
            <hr className="my-10 border-t-2 border-brand-silver/50" />
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-brand-gold pl-4 my-4 text-brand-muted italic">
              {children}
            </blockquote>
          ),
          code: ({ children, className }) => {
            const isBlock = className?.includes("language-");
            if (isBlock) {
              return (
                <code className="block bg-brand-cream rounded-md p-4 my-4 font-mono text-sm text-brand-body whitespace-pre overflow-x-auto">
                  {children}
                </code>
              );
            }
            return (
              <code className="bg-brand-cream px-1.5 py-0.5 rounded text-sm font-mono text-brand-slate">
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre className="bg-brand-cream rounded-md p-4 my-4 overflow-x-auto">
              {children}
            </pre>
          ),
        }}
      >
        {content}
      </Markdown>
    </div>
  );
}
