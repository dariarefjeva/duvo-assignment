import { Pill } from "../primitives/Pill";
import { Button } from "../primitives/Button";
import type { JobStatus } from "../../data/types";
import "./TopBar.css";

const statusToPill: Record<JobStatus, { tone: "amber" | "green" | "violet" | "neutral"; label: string }> = {
  draft:          { tone: "neutral", label: "Draft" },
  queued:         { tone: "neutral", label: "Queued" },
  running:        { tone: "violet",  label: "Running" },
  awaiting_input: { tone: "amber",   label: "Awaiting input" },
  completed:      { tone: "green",   label: "Completed" },
  failed:         { tone: "amber",   label: "Failed" },
  cancelled:      { tone: "neutral", label: "Cancelled" },
};

type Props = {
  jobId: string;
  status: JobStatus;
  runtime: string;
  onPause?: () => void;
  onCancel?: () => void;
};

export function TopBar({ jobId, status, runtime, onPause, onCancel }: Props) {
  const p = statusToPill[status];
  const showPause = status === "running" || status === "awaiting_input";
  return (
    <header className="topbar">
      <div className="topbar__left">
        <div className="topbar__logo">D</div>
        <nav className="topbar__crumb">
          <a href="#/">Jobs</a>
          <span> / </span>
          <a href="#/run">Find &amp; apply to a job</a>
          <span> / </span>
          <span className="topbar__crumb-current">Run #{jobId}</span>
        </nav>
      </div>
      <div className="topbar__right">
        <Pill tone={p.tone} dot>{p.label}</Pill>
        <span className="topbar__runtime">{runtime}</span>
        {showPause && (
          <>
            <Button onClick={onPause}>Pause</Button>
            <Button variant="danger" onClick={onCancel}>Cancel</Button>
          </>
        )}
        {status === "completed" && (
          <Button variant="primary" onClick={() => (window.location.hash = "#/run")}>
            New run
          </Button>
        )}
      </div>
    </header>
  );
}
