import { LibraryHeader } from "@/components/library-header";
import { PaperPanel } from "@/components/paper-panel";

export default function AboutPage() {
  return (
    <main className="page">
      <LibraryHeader title="关于" subtitle="每个地址一组收藏列表。" badge="Mini App Note" />
      <PaperPanel>
        <div style={{ padding: 22, display: "grid", gap: 12 }}>
          <p className="section-kicker">About</p>
          <h2 className="section-title">bookmark-box</h2>
          <p className="muted" style={{ margin: 0, lineHeight: 1.7 }}>
            保存链接，查看详情，继续编辑，按地址整理自己的链上书签。
          </p>
        </div>
      </PaperPanel>
    </main>
  );
}

