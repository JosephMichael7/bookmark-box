"use client";

import { useRouter } from "next/navigation";
import { archiveBookmark } from "@/lib/local-bookmark-store";
import { useToast } from "@/providers/toast-provider";

export function DeleteBookmarkButton({
  address,
  url,
}: {
  address: string;
  url: string;
}) {
  const router = useRouter();
  const { pushToast } = useToast();

  return (
    <button
      className="button danger"
      type="button"
      onClick={() => {
        if (!window.confirm("将这张卡片从当前地址的目录中隐藏？")) return;
        archiveBookmark(address, url);
        pushToast("已从当前目录移除");
        router.push("/bookmarks");
        router.refresh();
      }}
    >
      删除
    </button>
  );
}

