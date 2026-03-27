"use client";

import { useAccount } from "wagmi";

export function AddressSummary() {
  const { address } = useAccount();

  return (
    <div
      className="paper-panel grain"
      style={{
        padding: 18,
        borderRadius: 20,
        display: "grid",
        gap: 8,
        background: "linear-gradient(180deg, rgba(107,79,58,0.08), rgba(255,255,255,0.72))",
      }}
    >
      <p className="section-kicker">Current Shelf</p>
      <strong style={{ fontSize: "1rem", wordBreak: "break-all" }}>{address ?? "未连接钱包，显示演示目录"}</strong>
      <p className="muted" style={{ margin: 0, fontSize: "0.88rem" }}>每个地址维护自己的收藏列表。</p>
    </div>
  );
}

