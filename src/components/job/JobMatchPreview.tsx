import { Chip } from "../primitives/Chip";
import { Pill } from "../primitives/Pill";
import type { JobMatch } from "../../data/types";
import "./JobMatchPreview.css";

export function JobMatchPreview({ match }: { match: JobMatch }) {
  return (
    <div className="match">
      <div className="match__top">
        <div className="match__title-wrap">
          <h3 className="match__title">{match.title}</h3>
          <p className="match__meta">{match.meta}</p>
        </div>
        <Pill tone="green">{match.matchScore}% match</Pill>
      </div>
      <p className="match__reasoning">{match.reasoning}</p>
      <div className="match__chips">
        {match.chips.map((c) => <Chip key={c}>{c}</Chip>)}
      </div>
    </div>
  );
}
