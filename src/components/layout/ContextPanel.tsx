import type { JobRun } from "../../data/types";
import "./ContextPanel.css";

type Row = [label: string, value: string];

type SectionProps = { title: string; rows: Row[] };

function Section({ title, rows }: SectionProps) {
  return (
    <section className="ctx__section">
      <h4 className="ctx__section-title">{title}</h4>
      <div className="ctx__rows">
        {rows.map(([k, v]) => (
          <div className="ctx__row" key={k}>
            <span className="ctx__row-key">{k}</span>
            <span className="ctx__row-value">{v}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

const statusLabel: Record<JobRun["status"], string> = {
  draft: "Draft",
  queued: "Queued",
  running: "Running",
  awaiting_input: "Awaiting input",
  completed: "Completed",
  failed: "Failed",
  cancelled: "Cancelled",
};

export function ContextPanel({ job }: { job: JobRun }) {
  const stepsDone = job.steps.filter((s) => s.status === "done").length;
  const totalSteps = job.steps.length;
  const awaitingCount = job.steps.filter((s) => s.status === "awaiting_input").length;

  return (
    <aside className="ctx">
      <Section
        title="Run summary"
        rows={[
          ["Status", statusLabel[job.status]],
          ["Started", job.startedLabel],
          ["Runtime", job.runtime],
          ["Steps done", `${stepsDone} of ${totalSteps}`],
          ["Applications", `${job.applicationsSubmitted.length} of 4 planned`],
        ]}
      />
      <Section
        title="Sources"
        rows={[
          ["LinkedIn", "connected"],
          ["Welcome to the Jungle", "connected"],
          ["Otta", "connected"],
          ["CV (PDF)", "arefjeva_cv.pdf"],
          ["Portfolio", "aredarja.com"],
        ]}
      />
      <Section
        title="Requirements"
        rows={[
          ["Role", "Senior Product Designer"],
          ["Region", "EU (remote)"],
          ["Salary", "€70–95k"],
          ["Domain", "B2B SaaS"],
          ["Hard pass", "On-site, US time zones"],
        ]}
      />
      <Section
        title="Approvals so far"
        rows={[
          ["Auto-approved", String(job.applicationsSubmitted.length)],
          ["Awaiting you", String(awaitingCount)],
          ["Skipped", "0"],
        ]}
      />

      <div className="ctx__log">
        <h4 className="ctx__section-title">Agent log</h4>
        <div className="ctx__log-lines">
          {[
            "12:22:41  ranked 12 → 4 candidates",
            "12:22:39  scored \"Acme Health\" 92%",
            "12:22:30  scored \"Northwind\" 88%",
            "12:22:18  fetched 47 postings",
            "12:18:02  job started",
          ].map((l) => (
            <div key={l} className="ctx__log-line">{l}</div>
          ))}
        </div>
      </div>
    </aside>
  );
}
