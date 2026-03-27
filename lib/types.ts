export type BookmarkSourceType = "website" | "tweet" | "article" | "video" | "other";

export type BookmarkRecord = {
  id: string;
  title: string;
  url: string;
  note: string;
  tags: string[];
  sourceType: BookmarkSourceType;
  createdAt: string;
  updatedAt: string;
  owner: string;
  isStoredOnchain: boolean;
  isArchivedLocally?: boolean;
};

export type BookmarkDraft = {
  title: string;
  url: string;
  note: string;
  tags: string[];
  sourceType: BookmarkSourceType;
};

