import { TopBar } from "../components/layout/TopBar";
import { HITLBanner } from "../components/layout/HITLBanner";
import { ContextPanel } from "../components/layout/ContextPanel";
import { Timeline } from "../components/job/Timeline";
import { JobMatchPreview } from "../components/job/JobMatchPreview";
import { completedJob } from "../data/mockJob";
import "./JobResultView.css";

export function JobResultView() {
  const job = completedJob;

  return (
    <div className="result">
      <TopBar jobId={job.id} status={job.status} runtime={job.runtime} />

      <div className="result__body">
        <main className="result__main">
          <header className="result__header">
            <h1 className="result__title">{job.title}</h1>
            <p className="result__subtitle">{job.subtitle}</p>
          </header>

          <Timeline steps={job.steps} />

          <HITLBanner
            variant="violet"
            message={`Application submitted for ${job.applicationsSubmitted.length} job postings. Good luck!`}
            primaryLabel="Jump to"
            onPrimary={() => {
              const el = document.getElementById("apps-sent");
              el?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            dismissible
          />

          <section id="apps-sent" className="result__apps">
            <h2 className="result__apps-title">
              <span className="result__apps-check">
                <svg viewBox="0 0 24 24" width="14" height="14"><path d="M5 12.5l4.2 4.2L19 7" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
              Application sent to
              <span className="result__apps-count">{job.applicationsSubmitted.length}</span>
            </h2>
            <div className="result__apps-list">
              {job.applicationsSubmitted.map((m) => (
                <JobMatchPreview key={m.id} match={m} />
              ))}
            </div>
          </section>
        </main>

        <ContextPanel job={job} />
      </div>
    </div>
  );
}
