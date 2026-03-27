import { readDomain } from "@/lib/bookmark-utils";
import type { BookmarkRecord } from "@/lib/types";
import { StatusChip } from "@/components/status-chip";

export function BookmarkMeta({ bookmark }: { bookmark: BookmarkRecord }) {
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div className="card-row" style={{ flexWrap: "wrap" }}>
        <StatusChip tone="sage">{bookmark.sourceType}</StatusChip>
        <StatusChip tone="gold">{readDomain(bookmark.url)}</StatusChip>
        {bookmark.tags.slice(0, 2).map((tag) => (
          <StatusChip key={tag} tone="terra">
            #{tag}
          </StatusChip>
        ))}
      </div>
      <div className="meta-grid">
        <div className="meta-item">
          <p className="meta-label">链接</p>
          <p className="meta-value" style={{ wordBreak: "break-all" }}>
            {bookmark.url}
          </p>
        </div>
        <div className="meta-item">
          <p className="meta-label">更新时间</p>
          <p className="meta-value">{new Date(bookmark.updatedAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}

