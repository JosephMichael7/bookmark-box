"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import type { BookmarkDraft, BookmarkRecord, BookmarkSourceType } from "@/lib/types";
import { cleanUrl, inferSourceType, makeBookmarkId } from "@/lib/bookmark-utils";
import { saveBookmarkDraft } from "@/lib/local-bookmark-store";
import { bookmarkBoxAbi, bookmarkBoxAddress } from "@/lib/contracts";
import { APP_NAME, TRACKING_APP_ID } from "@/lib/app-constants";
import { LinkPreviewPanel } from "@/components/link-preview-panel";
import { useToast } from "@/providers/toast-provider";
import { trackTransaction } from "@/utils/track";

const sourceOptions: BookmarkSourceType[] = ["website", "tweet", "article", "video", "other"];

export function BookmarkEditorForm({
  mode,
  initialValue,
}: {
  mode: "create" | "edit";
  initialValue?: BookmarkRecord | null;
}) {
  const router = useRouter();
  const { address } = useAccount();
  const { pushToast } = useToast();
  const [form, setForm] = useState<BookmarkDraft>({
    title: initialValue?.title ?? "",
    url: initialValue?.url ?? "",
    note: initialValue?.note ?? "",
    tags: initialValue?.tags ?? [],
    sourceType: initialValue?.sourceType ?? "website",
  });
  const [tagInput, setTagInput] = useState(initialValue?.tags.join(", ") ?? "");

  useEffect(() => {
    if (!initialValue) return;
    setForm({
      title: initialValue.title,
      url: initialValue.url,
      note: initialValue.note,
      tags: initialValue.tags,
      sourceType: initialValue.sourceType,
    });
    setTagInput(initialValue.tags.join(", "));
  }, [initialValue]);

  const { data: txHash, isPending, writeContractAsync } = useWriteContract();
  const receipt = useWaitForTransactionReceipt({ hash: txHash });

  useEffect(() => {
    if (receipt.isSuccess && txHash && address) {
      trackTransaction(TRACKING_APP_ID, APP_NAME, address, txHash);
    }
  }, [address, receipt.isSuccess, txHash]);

  const previewUrl = useMemo(() => cleanUrl(form.url), [form.url]);
  const canSubmit = Boolean(address && form.title.trim() && previewUrl);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!address) {
      pushToast("请先连接钱包");
      return;
    }

    const payload: BookmarkDraft = {
      ...form,
      title: form.title.trim(),
      url: previewUrl,
      note: form.note.trim(),
      tags: tagInput.split(",").map((item) => item.trim()).filter(Boolean),
      sourceType: form.sourceType || inferSourceType(previewUrl),
    };

    saveBookmarkDraft(address, payload);

    if (mode === "edit") {
      pushToast("目录卡已更新");
      router.push(`/bookmarks/${makeBookmarkId(payload.url)}`);
      router.refresh();
      return;
    }

    try {
      const hash = await writeContractAsync({
        abi: bookmarkBoxAbi,
        address: bookmarkBoxAddress,
        functionName: "add",
        args: [payload.url],
      });

      trackTransaction(TRACKING_APP_ID, APP_NAME, address, hash);
      pushToast("已提交到链上");
      router.push(`/bookmarks/${makeBookmarkId(payload.url)}`);
      router.refresh();
    } catch {
      pushToast("链上保存未完成，已保留本地草稿");
    }
  }

  return (
    <form className="stack" onSubmit={onSubmit}>
      <div className="field">
        <label htmlFor="title">标题</label>
        <input
          id="title"
          className="input"
          value={form.title}
          onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
          placeholder="例如：Base 文档"
        />
      </div>

      <div className="field">
        <label htmlFor="url">链接 URL</label>
        <input
          id="url"
          className="input"
          inputMode="url"
          value={form.url}
          onChange={(event) => setForm((prev) => ({ ...prev, url: event.target.value }))}
          placeholder="https://..."
        />
      </div>

      <div className="field">
        <label htmlFor="sourceType">来源类型</label>
        <select
          id="sourceType"
          className="input"
          value={form.sourceType}
          onChange={(event) => setForm((prev) => ({ ...prev, sourceType: event.target.value as BookmarkSourceType }))}
        >
          {sourceOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="note">简介 / 备注</label>
        <textarea
          id="note"
          className="textarea"
          value={form.note}
          onChange={(event) => setForm((prev) => ({ ...prev, note: event.target.value }))}
          placeholder="一句简短说明就够了"
        />
      </div>

      <div className="field">
        <label htmlFor="tags">标签</label>
        <input
          id="tags"
          className="input"
          value={tagInput}
          onChange={(event) => setTagInput(event.target.value)}
          placeholder="base, docs, reading"
        />
      </div>

      <LinkPreviewPanel url={previewUrl} title={form.title} />

      <button className="button" disabled={!canSubmit || isPending} type="submit">
        {isPending ? "提交中..." : mode === "create" ? "保存到目录" : "更新目录卡"}
      </button>

      {receipt.isLoading ? (
        <p className="muted" style={{ margin: 0, fontSize: "0.88rem" }}>
          等待链上确认...
        </p>
      ) : null}

      <p className="muted" style={{ margin: 0, fontSize: "0.84rem", lineHeight: 1.5 }}>
        当前合约仅支持链上保存 URL。标题、备注、标签、编辑与删除先作为本地扩展层封装，方便后续切换到完整合约。
      </p>
    </form>
  );
}

