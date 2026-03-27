import { makeBookmarkId } from "@/lib/bookmark-utils";
import type { BookmarkRecord } from "@/lib/types";

export const mockBookmarks: BookmarkRecord[] = [
  {
    id: makeBookmarkId("https://base.org"),
    title: "Base",
    url: "https://base.org",
    note: "链上入口与生态总览",
    tags: ["base", "ecosystem"],
    sourceType: "website",
    createdAt: "2026-03-20T09:00:00.000Z",
    updatedAt: "2026-03-20T09:00:00.000Z",
    owner: "demo",
    isStoredOnchain: true,
  },
  {
    id: makeBookmarkId("https://x.com/base"),
    title: "Base on X",
    url: "https://x.com/base",
    note: "活动与更新提醒",
    tags: ["tweet", "updates"],
    sourceType: "tweet",
    createdAt: "2026-03-21T08:00:00.000Z",
    updatedAt: "2026-03-21T08:00:00.000Z",
    owner: "demo",
    isStoredOnchain: true,
  },
  {
    id: makeBookmarkId("https://docs.base.org"),
    title: "Base Docs",
    url: "https://docs.base.org",
    note: "开发文档与链上说明",
    tags: ["docs", "reference"],
    sourceType: "article",
    createdAt: "2026-03-22T07:00:00.000Z",
    updatedAt: "2026-03-22T07:00:00.000Z",
    owner: "demo",
    isStoredOnchain: true,
  },
];

