"use client";

import { useEffect, useRef } from "react";

export function AutoDownload({ url }: { url: string }) {
  const triggered = useRef(false);

  useEffect(() => {
    if (triggered.current) return;
    triggered.current = true;

    const link = document.createElement("a");
    link.href = url;
    link.download = "";
    document.body.appendChild(link);
    link.click();
    link.remove();
  }, [url]);

  return null;
}
