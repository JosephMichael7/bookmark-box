"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { BookmarkEditorForm } from "@/components/bookmark-editor-form";
import { LibraryHeader } from "@/components/library-header";
import { PaperPanel } from "@/components/paper-panel";
import { getBookmarkById } from "@/lib/bookmark-data";

export default function EditBookmarkPage() {
  const params = useParams<{ id: string }>();
  const { address } = useAccount();
  const query = useQuery({
    queryKey: ["bookmark-edit", address ?? "demo", params.id],
    queryFn: () => getBookmarkById(address, params.id),
  });

  return (
    <main className="page">
      <LibraryHeader title="修订目录卡" subtitle="更新标题、备注与标签。" badge="编辑页" />

      <PaperPanel>
        <div style={{ padding: 22, display: "grid", gap: 18 }}>
          <div>
            <p className="section-kicker">Edit Entry</p>
            <h2 className="section-title">整理这张旧卡片</h2>
          </div>
          <BookmarkEditorForm mode="edit" initialValue={query.data} />
        </div>
      </PaperPanel>
    </main>
  );
}

