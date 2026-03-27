"use client";

import { useMemo } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useToast } from "@/providers/toast-provider";

function shortAddress(address?: string) {
  if (!address) return "Connect";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function WalletButton({ compact = false }: { compact?: boolean }) {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { pushToast } = useToast();

  const primaryConnector = useMemo(() => connectors[0], [connectors]);

  if (isConnected) {
    return (
      <button
        className={`button ${compact ? "ghost" : ""}`}
        onClick={() => {
          disconnect();
          pushToast("钱包已断开");
        }}
        type="button"
      >
        {shortAddress(address)}
      </button>
    );
  }

  return (
    <button
      className={`button ${compact ? "ghost" : ""}`}
      disabled={!primaryConnector || isPending}
      onClick={() => {
        if (!primaryConnector) {
          pushToast("未发现可用钱包");
          return;
        }
        connect({ connector: primaryConnector });
      }}
      type="button"
    >
      {isPending ? "连接中..." : compact ? "连接" : "连接钱包"}
    </button>
  );
}

