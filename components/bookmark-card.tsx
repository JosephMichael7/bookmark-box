import Link from "next/link";
import { BookmarkMeta } from "@/components/bookmark-meta";
import type { BookmarkRecord } from "@/lib/types";

export function BookmarkCard({
  bookmark,
  index,
}: {
  bookmark: BookmarkRecord;
  index?: number;
}) {
  return (
    <Link
      href={`/bookmarks/${bookmark.id}`}
      className="paper-panel grain"
      style={{ display: "block", padding: 16, borderRadius: 20, position: "relative", overflow: "hidden" }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, width: 72, height: 6, background: "linear-gradient(90deg, var(--wood), var(--gold))" }} />
      <div style={{ display: "grid", gap: 12 }}>
        <div className="card-row" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ display: "grid", gap: 4 }}>
            <span style={{ color: "var(--muted)", fontSize: "0.78rem" }}>{String(index ?? 0).padStart(2, "0")}</span>
            <h3 style={{ margin: 0, fontSize: "1.04rem", fontWeight: 700, lineHeight: 1.35 }}>{bookmark.title}</h3>
          </div>
          <span style={{ color: "var(--wood)", fontSize: "1rem" }}>↗</span>
        </div>
        {bookmark.note ? (
          <p className="muted" style={{ margin: 0, lineHeight: 1.5, fontSize: "0.9rem" }}>
            {bookmark.note}
          </p>
        ) : null}
        <BookmarkMeta bookmark={bookmark} />
      </div>
    </Link>
  );
}

