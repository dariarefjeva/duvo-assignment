import type { ButtonHTMLAttributes, ReactNode } from "react";
import "./Button.css";

type Variant = "ghost" | "primary" | "danger";
type Size = "md" | "sm";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
};

export function Button({ variant = "ghost", size = "md", className = "", children, ...rest }: Props) {
  return (
    <button
      className={`btn btn--${variant} btn--${size} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
