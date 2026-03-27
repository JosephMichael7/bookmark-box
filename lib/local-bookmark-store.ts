"use client";

import type { BookmarkDraft, BookmarkRecord } from "@/lib/types";
import { cleanUrl, makeBookmarkId, mergeBookmarkRecord, normalizeAddress } from "@/lib/bookmark-utils";

const STORAGE_KEY = "bookmark-box.local-overrides.v1";

type OverrideShape = Record<string, Record<string, Partial<BookmarkRecord>>>;

function canUseStorage() {
  return typeof window !== "undefined";
}

function readStore(): OverrideShape {
  if (!canUseStorage()) return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as OverrideShape) : {};
  } catch {
    return {};
  }
}

function writeStore(next: OverrideShape) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

function getAddressBucket(address: string, store = readStore()) {
  const normalized = normalizeAddress(address);
  return store[normalized] ?? {};
}

export function getBookmarkOverride(address: string, url: string) {
  const bucket = getAddressBucket(address);
  return bucket[makeBookmarkId(url)];
}

export function listLocalOverrides(address: string) {
  return Object.values(getAddressBucket(address)) as Partial<BookmarkRecord>[];
}

export function saveBookmarkDraft(address: string, draft: BookmarkDraft) {
  const store = readStore();
  const normalized = normalizeAddress(address);
  const url = cleanUrl(draft.url);
  const id = makeBookmarkId(url);
  const previous = store[normalized]?.[id];
  const next: Partial<BookmarkRecord> = {
    ...previous,
    id,
    owner: normalized,
    url,
    title: draft.title.trim(),
    note: draft.note.trim(),
    tags: draft.tags,
    sourceType: draft.sourceType,
    updatedAt: new Date().toISOString(),
    createdAt: previous?.createdAt || new Date().toISOString(),
  };

  writeStore({
    ...store,
    [normalized]: {
      ...store[normalized],
      [id]: next,
    },
  });

  return next;
}

export function archiveBookmark(address: string, url: string) {
  const store = readStore();
  const normalized = normalizeAddress(address);
  const id = makeBookmarkId(url);
  const previous = store[normalized]?.[id] ?? mergeBookmarkRecord(normalized, url);

  writeStore({
    ...store,
    [normalized]: {
      ...store[normalized],
      [id]: {
        ...previous,
        isArchivedLocally: true,
        updatedAt: new Date().toISOString(),
      },
    },
  });
}

