import { BookmarkEditorForm } from "@/components/bookmark-editor-form";
import { LibraryHeader } from "@/components/library-header";
import { PaperPanel } from "@/components/paper-panel";

export default function NewBookmarkPage() {
  return (
    <main className="page">
      <LibraryHeader title="新建目录卡" subtitle="填入标题和链接，保存到当前地址的收藏盒。" badge="录入页" />

      <PaperPanel>
        <div style={{ padding: 22, display: "grid", gap: 18 }}>
          <div>
            <p className="section-kicker">New Entry</p>
            <h2 className="section-title">安静录入一条链接</h2>
          </div>
          <BookmarkEditorForm mode="create" />
        </div>
      </PaperPanel>
    </main>
  );
}

