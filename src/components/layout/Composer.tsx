import { useState } from "react";
import { Button } from "../primitives/Button";
import "./Composer.css";

type Props = {
  placeholder?: string;
  onSubmit?: (text: string) => void;
};

export function Composer({ placeholder = "Send a note to the agent…", onSubmit }: Props) {
  const [v, setV] = useState("");
  const submit = () => {
    if (!v.trim()) return;
    onSubmit?.(v.trim());
    setV("");
  };
  return (
    <div className="composer">
      <input
        className="composer__input"
        value={v}
        placeholder={placeholder}
        onChange={(e) => setV(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter") submit(); }}
      />
      <Button variant="primary" onClick={submit}>Send</Button>
    </div>
  );
}
