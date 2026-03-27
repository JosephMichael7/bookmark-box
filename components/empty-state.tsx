import Link from "next/link";
import { PaperPanel } from "@/components/paper-panel";

export function EmptyState({ title, hint }: { title: string; hint: string }) {
  return (
    <PaperPanel className="grain">
      <div style={{ padding: 22, display: "grid", gap: 14 }}>
        <div style={{ width: 54, height: 54, borderRadius: 18, background: "rgba(107, 79, 58, 0.08)", display: "grid", placeItems: "center", fontSize: "1.25rem" }}>
          ?
        </div>
        <div style={{ display: "grid", gap: 6 }}>
          <h3 style={{ margin: 0, fontSize: "1.02rem" }}>{title}</h3>
          <p className="muted" style={{ margin: 0, lineHeight: 1.55, fontSize: "0.92rem" }}>
            {hint}
          </p>
        </div>
        <Link href="/bookmarks/new" className="button" style={{ width: "fit-content" }}>
          新建收藏
        </Link>
      </div>
    </PaperPanel>
  );
}

