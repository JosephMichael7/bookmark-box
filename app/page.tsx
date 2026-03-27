"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { AddressSummary } from "@/components/address-summary";
import { BookmarkList } from "@/components/bookmark-list";
import { LibraryHeader } from "@/components/library-header";
import { ShelfSection } from "@/components/shelf-section";
import { getBookmarksForAddress } from "@/lib/bookmark-data";

export default function HomePage() {
  const { address } = useAccount();
  const query = useQuery({
    queryKey: ["bookmarks", address ?? "demo"],
    queryFn: () => getBookmarksForAddress(address),
  });

  const items = query.data ?? [];

  return (
    <main className="page">
      <LibraryHeader
        title="书签盒入口"
        subtitle="保存、整理、回看你自己的链上链接卡。"
        badge={address ? "已连接当前地址" : "演示目录已开启"}
      />

      <div className="stack">
        <section
          className="paper-panel grain"
          style={{
            padding: 22,
            borderRadius: 26,
            display: "grid",
            gap: 16,
            background: "linear-gradient(145deg, rgba(107,79,58,0.1), rgba(184,138,68,0.06) 38%, rgba(255,255,255,0.72) 80%)",
          }}
        >
          <div style={{ display: "grid", gap: 8 }}>
            <p className="section-kicker">Bookmark Drawer</p>
            <h2 className="section-title" style={{ fontSize: "1.6rem" }}>
              安静地把常用链接收进一格一格目录里
            </h2>
            <p className="muted" style={{ margin: 0, lineHeight: 1.6 }}>
              不做喧闹首页，只保留入口、目录和卡片。
            </p>
          </div>
          <div className="two-col">
            <Link href="/bookmarks" className="button">
              查看我的收藏
            </Link>
            <Link href="/bookmarks/new" className="button secondary">
              新建收藏
            </Link>
          </div>
          <AddressSummary />
        </section>

        <ShelfSection kicker="Recent Cards" title="最近收藏" actionLabel="全部目录" actionHref="/bookmarks">
          <BookmarkList
            items={items.slice(0, 3)}
            emptyTitle="这里还没有卡片"
            emptyHint="连接钱包后，把第一条常用链接收进来。"
          />
        </ShelfSection>
      </div>
    </main>
  );
}

