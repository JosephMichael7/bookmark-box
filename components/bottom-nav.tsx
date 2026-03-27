"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "入口", icon: "?" },
  { href: "/bookmarks", label: "目录", icon: "?" },
  { href: "/bookmarks/new", label: "新卡", icon: "+" },
  { href: "/my", label: "我的", icon: "?" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav style={{ position: "fixed", left: "50%", bottom: 14, transform: "translateX(-50%)", width: "min(92vw, 500px)", zIndex: 50 }}>
      <div
        className="paper-panel"
        style={{
          padding: 10,
          borderRadius: 24,
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: 8,
          backdropFilter: "blur(12px)",
        }}
      >
        {items.map((item) => {
          const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                borderRadius: 18,
                minHeight: 54,
                display: "grid",
                placeItems: "center",
                gap: 2,
                background: active ? "rgba(107, 79, 58, 0.1)" : "transparent",
                border: active ? "1px solid rgba(107, 79, 58, 0.22)" : "1px solid transparent",
                color: active ? "var(--wood)" : "var(--muted)",
                transition: "all 160ms ease",
              }}
            >
              <span style={{ fontSize: "1rem", lineHeight: 1 }}>{item.icon}</span>
              <span style={{ fontSize: "0.76rem" }}>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

