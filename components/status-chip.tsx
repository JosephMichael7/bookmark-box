export function StatusChip({
  tone = "default",
  children,
}: {
  tone?: "default" | "sage" | "gold" | "terra";
  children: React.ReactNode;
}) {
  const toneMap = {
    default: "rgba(255,255,255,0.62)",
    sage: "rgba(122, 140, 123, 0.14)",
    gold: "rgba(184, 138, 68, 0.14)",
    terra: "rgba(166, 106, 76, 0.14)",
  };

  return (
    <span className="status-chip" style={{ background: toneMap[tone] }}>
      {children}
    </span>
  );
}

