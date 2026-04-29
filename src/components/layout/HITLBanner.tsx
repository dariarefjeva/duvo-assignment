import { useState } from "react";
import { Button } from "../primitives/Button";
import "./HITLBanner.css";

type Variant = "amber" | "violet";

type Props = {
  variant: Variant;
  message: string;
  primaryLabel?: string;
  onPrimary?: () => void;
  dismissible?: boolean;
};

export function HITLBanner({ variant, message, primaryLabel = "Jump to", onPrimary, dismissible = true }: Props) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;
  return (
    <div className={`banner banner--${variant} fade-in`} role="status">
      <div className="banner__left">
        <span className={`banner__pulse banner__pulse--${variant}`}>
          <span className="banner__pulse-ring" />
          <span className="banner__pulse-dot" />
        </span>
        <span className="banner__text">{message}</span>
      </div>
      <div className="banner__right">
        {onPrimary && (
          <Button variant="primary" onClick={onPrimary}>{primaryLabel}</Button>
        )}
        {dismissible && <Button onClick={() => setDismissed(true)}>Dismiss</Button>}
      </div>
    </div>
  );
}
