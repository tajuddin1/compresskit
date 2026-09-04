import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/compress-image",
    "/compress-jpg",
    "/compress-png",
    "/compress-webp",
    "/compress-image-to-100kb",
    "/compress-image-to-200kb",
    "/image-resizer",
    "/image-converter",
    "/tools",
    "/blog",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/faq",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date("2026-09-05"),
    changeFrequency: route === "" || route.includes("compress") ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.startsWith("/compress") || route.startsWith("/image") ? 0.9 : 0.6,
  }));

  const blogEntries: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updated ?? post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...blogEntries];
}
