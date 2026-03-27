"use client";

import { readContract } from "@wagmi/core";
import { bookmarkBoxAbi, bookmarkBoxAddress } from "@/lib/contracts";
import { wagmiConfig } from "@/lib/wagmi";
import { getBookmarkOverride, listLocalOverrides } from "@/lib/local-bookmark-store";
import { mergeBookmarkRecord, normalizeAddress } from "@/lib/bookmark-utils";
import { mockBookmarks } from "@/lib/mock-bookmarks";
import type { BookmarkRecord } from "@/lib/types";

export async function getBookmarksForAddress(address?: string | null): Promise<BookmarkRecord[]> {
  const normalized = normalizeAddress(address);
  if (!normalized) return mockBookmarks;

  try {
    const urls = await readContract(wagmiConfig, {
      abi: bookmarkBoxAbi,
      address: bookmarkBoxAddress,
      functionName: "get",
      args: [normalized as `0x${string}`],
    });

    return urls
      .map((url) => mergeBookmarkRecord(normalized, url, getBookmarkOverride(normalized, url)))
      .filter((item) => !item.isArchivedLocally)
      .reverse();
  } catch {
    const fromLocal = listLocalOverrides(normalized)
      .filter((item): item is BookmarkRecord => Boolean(item.url))
      .map((item) => mergeBookmarkRecord(normalized, item.url!, item))
      .filter((item) => !item.isArchivedLocally);

    return fromLocal.length ? fromLocal.reverse() : mockBookmarks;
  }
}

export async function getBookmarkById(address: string | null | undefined, id: string) {
  const items = await getBookmarksForAddress(address);
  return items.find((item) => item.id === id) ?? null;
}

