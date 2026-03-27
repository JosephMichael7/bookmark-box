"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { LibraryHeader } from "@/components/library-header";
import { PaperPanel } from "@/components/paper-panel";
import { getBookmarksForAddress } from "@/lib/bookmark-data";

export default function MyPage() {
  const { address } = useAccount();
  const query = useQuery({
    queryKey: ["bookmarks", address ?? "demo"],
    queryFn: () => getBookmarksForAddress(address),
  });

  const items = query.data ?? [];

  return (
    <main className="page">
      <LibraryHeader title="我的地址" subtitle="当前地址与目录概况。" badge="Address Shelf" />

      <div className="stack">
        <PaperPanel>
          <div style={{ padding: 22, display: "grid", gap: 16 }}>
            <div>
              <p className="section-kicker">Wallet</p>
              <h2 className="section-title" style={{ fontSize: "1.1rem", wordBreak: "break-all" }}>
                {address ?? "未连接钱包"}
              </h2>
            </div>
            <div className="two-col">
              <div className="meta-item">
                <p className="meta-label">收藏数量</p>
                <p className="meta-value">{items.length}</p>
              </div>
              <div className="meta-item">
                <p className="meta-label">状态</p>
                <p className="meta-value">{address ? "链上目录已连接" : "演示模式"}</p>
              </div>
            </div>
            <div className="two-col">
              <Link href="/bookmarks" className="button">
                查看目录
              </Link>
              <Link href="/about" className="button secondary">
                关于
              </Link>
            </div>
          </div>
        </PaperPanel>
      </div>
    </main>
  );
}

