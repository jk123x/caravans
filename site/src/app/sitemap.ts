import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://caravansolar.au",
      lastModified: new Date("2026-02-28"),
    },
    {
      url: "https://caravansolar.au/quiz",
      lastModified: new Date("2026-02-28"),
    },
    {
      url: "https://caravansolar.au/free-guide",
      lastModified: new Date("2026-02-28"),
    },
  ];
}
