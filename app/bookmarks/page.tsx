"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { BookmarkList } from "@/components/bookmark-list";
import { LibraryHeader } from "@/components/library-header";
import { PaperPanel } from "@/components/paper-panel";
import { getBookmarksForAddress } from "@/lib/bookmark-data";

export default function BookmarksPage() {
  const { address } = useAccount();
  const query = useQuery({
    queryKey: ["bookmarks", address ?? "demo"],
    queryFn: () => getBookmarksForAddress(address),
  });

  const items = query.data ?? [];

  return (
    <main className="page page-wide">
      <LibraryHeader
        title="索引目录"
        subtitle="当前地址的全部收藏。"
        badge={address ? `${items.length} 张目录卡` : "演示目录"}
      />

      <div className="stack">
        <PaperPanel>
          <div style={{ padding: 18, display: "grid", gap: 14 }}>
            <div className="card-row" style={{ justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <p className="section-kicker">Catalog</p>
                <h2 className="section-title">个人书签档案页</h2>
              </div>
              <Link href="/bookmarks/new" className="button">
                新建
              </Link>
            </div>
            <p className="muted" style={{ margin: 0, fontSize: "0.9rem" }}>
              每张卡可单独打开、复制、编辑或移出目录。
            </p>
          </div>
        </PaperPanel>

        <BookmarkList
          items={items}
          emptyTitle="当前地址还没有收藏"
          emptyHint="你可以先记录常用网站、推文或文档链接。"
        />
      </div>
    </main>
  );
}

