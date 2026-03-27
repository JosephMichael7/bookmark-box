import Link from "next/link";
import { PaperPanel } from "@/components/paper-panel";

export function ShelfSection({
  kicker,
  title,
  actionLabel,
  actionHref,
  children,
}: {
  kicker: string;
  title: string;
  actionLabel?: string;
  actionHref?: string;
  children: React.ReactNode;
}) {
  return (
    <PaperPanel>
      <div style={{ padding: 20, display: "grid", gap: 16 }}>
        <div className="card-row" style={{ justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <p className="section-kicker">{kicker}</p>
            <h2 className="section-title">{title}</h2>
          </div>
          {actionLabel && actionHref ? (
            <Link href={actionHref} className="button ghost">
              {actionLabel}
            </Link>
          ) : null}
        </div>
        {children}
      </div>
    </PaperPanel>
  );
}

