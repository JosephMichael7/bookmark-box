import type { BookmarkDraft, BookmarkRecord, BookmarkSourceType } from "@/lib/types";

export function normalizeAddress(address?: string | null) {
  return (address ?? "").toLowerCase();
}

export function makeBookmarkId(url: string) {
  return encodeURIComponent(url);
}

export function inferSourceType(url: string): BookmarkSourceType {
  if (url.includes("x.com") || url.includes("twitter.com")) return "tweet";
  if (url.includes("youtube.com") || url.includes("youtu.be")) return "video";
  if (url.includes("mirror.xyz") || url.includes("medium.com")) return "article";
  if (url.startsWith("http")) return "website";
  return "other";
}

export function readDomain(url: string) {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return "未识别来源";
  }
}

export function cleanUrl(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return trimmed;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

export function createDraftFromUrl(url: string): BookmarkDraft {
  return {
    title: readDomain(url),
    url,
    note: "",
    tags: [],
    sourceType: inferSourceType(url),
  };
}

export function mergeBookmarkRecord(
  owner: string,
  url: string,
  local?: Partial<BookmarkRecord>,
): BookmarkRecord {
  const now = new Date().toISOString();
  return {
    id: makeBookmarkId(url),
    title: local?.title?.trim() || readDomain(url),
    url,
    note: local?.note?.trim() || "",
    tags: local?.tags ?? [],
    sourceType: local?.sourceType || inferSourceType(url),
    createdAt: local?.createdAt || now,
    updatedAt: local?.updatedAt || now,
    owner,
    isStoredOnchain: true,
    isArchivedLocally: local?.isArchivedLocally ?? false,
  };
}

