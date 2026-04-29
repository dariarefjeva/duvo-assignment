import { useState, forwardRef } from "react";
import { Button } from "../primitives/Button";
import { JobMatchPreview } from "./JobMatchPreview";
import type { HITL } from "../../data/types";
import "./HITLCard.css";

type Props = {
  hitl: HITL;
  onApprove: (note?: string) => void;
  onSkip: () => void;
};

export const HITLCard = forwardRef<HTMLDivElement, Props>(function HITLCard(
  { hitl, onApprove, onSkip },
  ref,
) {
  const [note, setNote] = useState("");
  return (
    <div ref={ref} className="hitl fade-up" role="region" aria-label="Action required">
      <header className="hitl__head">
        <div className="hitl__head-left">
          <span className="hitl__icon">?</span>
          <h2 className="hitl__title">{hitl.title}</h2>
        </div>
        <span className="hitl__paused">{hitl.pausedFor}</span>
      </header>

      <JobMatchPreview match={hitl.jobMatch} />

      <label className="hitl__composer">
        <input
          className="hitl__composer-input"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder='Add context for the agent (optional) — e.g. "skip if relocation required"'
        />
      </label>

      <div className="hitl__actions">
        <div className="hitl__actions-left">
          <Button>View full posting</Button>
          <Button>Why this match?</Button>
        </div>
        <div className="hitl__actions-right">
          <Button onClick={onSkip}>Skip</Button>
          <Button variant="primary" onClick={() => onApprove(note || undefined)}>
            Approve &amp; apply
          </Button>
        </div>
      </div>
    </div>
  );
});
