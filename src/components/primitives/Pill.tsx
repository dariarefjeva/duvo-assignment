import type { ReactNode } from "react";
import "./Pill.css";

export type PillTone = "amber" | "green" | "violet" | "neutral";

type Props = {
  tone?: PillTone;
  dot?: boolean;
  children: ReactNode;
  className?: string;
};

export function Pill({ tone = "neutral", dot = false, children, className = "" }: Props) {
  return (
    <span className={`pill pill--${tone} ${className}`}>
      {dot && <span className={`pill__dot pill__dot--${tone}`} />}
      <span className="pill__label">{children}</span>
    </span>
  );
}
