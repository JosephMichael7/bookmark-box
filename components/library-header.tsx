import Link from "next/link";
import { WalletButton } from "@/components/wallet-button";

export function LibraryHeader({
  title,
  subtitle,
  badge,
}: {
  title: string;
  subtitle: string;
  badge?: string;
}) {
  return (
    <header style={{ padding: "18px 2px 16px", display: "grid", gap: "14px" }}>
      <div className="card-row" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ display: "grid", gap: 4 }}>
          <Link
            href="/"
            style={{
              fontSize: "0.76rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--sage)",
            }}
          >
            bookmark-box
          </Link>
          <h1 className="section-title" style={{ marginTop: 2 }}>
            {title}
          </h1>
          <p className="muted" style={{ margin: 0, fontSize: "0.92rem" }}>
            {subtitle}
          </p>
        </div>
        <WalletButton compact />
      </div>
      {badge ? (
        <div className="status-chip" style={{ width: "fit-content" }}>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              background: "var(--gold)",
              display: "inline-block",
            }}
          />
          {badge}
        </div>
      ) : null}
    </header>
  );
}

