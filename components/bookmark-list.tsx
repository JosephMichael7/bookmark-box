import { BookmarkCard } from "@/components/bookmark-card";
import { EmptyState } from "@/components/empty-state";
import type { BookmarkRecord } from "@/lib/types";

export function BookmarkList({
  items,
  emptyTitle,
  emptyHint,
}: {
  items: BookmarkRecord[];
  emptyTitle?: string;
  emptyHint?: string;
}) {
  if (!items.length) {
    return <EmptyState title={emptyTitle ?? "还没有收藏"} hint={emptyHint ?? "先放进第一张链接卡"} />;
  }

  return (
    <div className="stack">
      {items.map((bookmark, index) => (
        <BookmarkCard key={bookmark.id} bookmark={bookmark} index={index + 1} />
      ))}
    </div>
  );
}

