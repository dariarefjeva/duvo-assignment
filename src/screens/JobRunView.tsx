import { useRef } from "react";
import { TopBar } from "../components/layout/TopBar";
import { HITLBanner } from "../components/layout/HITLBanner";
import { ContextPanel } from "../components/layout/ContextPanel";
import { Composer } from "../components/layout/Composer";
import { Timeline } from "../components/job/Timeline";
import { useJobSimulation } from "../hooks/useJobSimulation";
import "./JobRunView.css";

export function JobRunView() {
  const { job, awaiting, approve, skip } = useJobSimulation();
  const hitlRef = useRef<HTMLDivElement>(null);

  return (
    <div className="run">
      <TopBar
        jobId={job.id}
        status={job.status}
        runtime={job.runtime}
      />
      {awaiting && (
        <HITLBanner
          variant="amber"
          message="Agent paused on step 4 — needs you to approve a job match. Other steps queued; the agent will resume when you respond."
          primaryLabel="Jump to"
          onPrimary={() => hitlRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })}
        />
      )}
      {job.status === "completed" && (
        <HITLBanner
          variant="violet"
          message="Application submitted for 4 job postings. Good luck!"
          primaryLabel="View results"
          onPrimary={() => (window.location.hash = "#/result")}
        />
      )}

      <div className="run__body">
        <main className="run__main">
          <header className="run__header">
            <h1 className="run__title">{job.title}</h1>
            <p className="run__subtitle">{job.subtitle}</p>
          </header>

          <Timeline
            steps={job.steps}
            hitlRef={hitlRef}
            onApprove={approve}
            onSkip={skip}
          />

          <Composer
            placeholder="Send a note to the agent — pin context, change priorities, ask a question…"
          />
        </main>

        <ContextPanel job={job} />
      </div>
    </div>
  );
}
