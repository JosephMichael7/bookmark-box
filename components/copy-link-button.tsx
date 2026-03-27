"use client";

import { useToast } from "@/providers/toast-provider";

export function CopyLinkButton({ url }: { url: string }) {
  const { pushToast } = useToast();

  return (
    <button
      className="button secondary"
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(url);
        pushToast("链接已复制");
      }}
    >
      复制链接
    </button>
  );
}

