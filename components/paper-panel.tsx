export function PaperPanel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <section className={["paper-panel grain", className].filter(Boolean).join(" ")}>{children}</section>;
}

