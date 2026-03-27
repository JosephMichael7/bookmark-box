"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { BookmarkMeta } from "@/components/bookmark-meta";
import { CopyLinkButton } from "@/components/copy-link-button";
import { DeleteBookmarkButton } from "@/components/delete-bookmark-button";
import { LibraryHeader } from "@/components/library-header";
import { PaperPanel } from "@/components/paper-panel";
import { getBookmarkById } from "@/lib/bookmark-data";

export default function BookmarkDetailPage() {
  const params = useParams<{ id: string }>();
  const { address } = useAccount();
  const query = useQuery({
    queryKey: ["bookmark", address ?? "demo", params.id],
    queryFn: () => getBookmarkById(address, params.id),
  });

  const bookmark = query.data;

  return (
    <main className="page">
      <LibraryHeader
        title="目录卡详情"
        subtitle="单张卡片的完整信息。"
        badge={bookmark?.isStoredOnchain ? "链上 URL / 本地扩展信息" : "详情"}
      />

      {!bookmark ? (
        <PaperPanel>
          <div style={{ padding: 22, display: "grid", gap: 12 }}>
            <h2 className="section-title">未找到这张卡</h2>
            <p className="muted" style={{ margin: 0 }}>
              可能已经被移出当前目录，或者当前地址不匹配。
            </p>
            <Link href="/bookmarks" className="button" style={{ width: "fit-content" }}>
              返回目录
            </Link>
          </div>
        </PaperPanel>
      ) : (
        <div className="stack">
          <PaperPanel>
            <div style={{ padding: 22, display: "grid", gap: 18 }}>
              <div style={{ display: "grid", gap: 10 }}>
                <p className="section-kicker">Bookmark Ticket</p>
                <h2 className="section-title" style={{ fontSize: "1.5rem" }}>
                  {bookmark.title}
                </h2>
                {bookmark.note ? (
                  <p className="muted" style={{ margin: 0, lineHeight: 1.65 }}>
                    {bookmark.note}
                  </p>
                ) : null}
              </div>
              <BookmarkMeta bookmark={bookmark} />
              <div className="detail-grid">
                <a href={bookmark.url} target="_blank" rel="noreferrer" className="button ghost" style={{ width: "100%" }}>
                  打开原链接
                </a>
                <div className="two-col">
                  <CopyLinkButton url={bookmark.url} />
                  <Link href={`/bookmarks/edit/${bookmark.id}`} className="button secondary">
                    编辑
                  </Link>
                </div>
                <div className="two-col">
                  <Link href="/bookmarks" className="button ghost">
                    返回目录
                  </Link>
                  <DeleteBookmarkButton address={address ?? bookmark.owner} url={bookmark.url} />
                </div>
              </div>
            </div>
          </PaperPanel>
        </div>
      )}
    </main>
  );
}

