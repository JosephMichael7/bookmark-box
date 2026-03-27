import { readDomain } from "@/lib/bookmark-utils";

export function LinkPreviewPanel({ url, title }: { url: string; title?: string }) {
  return (
    <div
      className="paper-panel grain"
      style={{
        padding: 16,
        borderRadius: 18,
        display: "grid",
        gap: 8,
        background: "linear-gradient(180deg, rgba(122, 140, 123, 0.12), rgba(255,255,255,0.68))",
      }}
    >
      <p className="meta-label" style={{ marginBottom: 0 }}>
        预览
      </p>
      <strong style={{ fontSize: "0.98rem" }}>{title || readDomain(url || "https://example.com")}</strong>
      <span className="muted" style={{ fontSize: "0.88rem", wordBreak: "break-all" }}>{url || "https://example.com"}</span>
    </div>
  );
}

