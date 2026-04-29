import type { JobMatch, JobRun } from "./types";

export const acmeMatch: JobMatch = {
  id: "acme-health",
  title: "Senior Product Designer — Acme Health",
  company: "Acme Health",
  meta: "Remote (EU)  ·  €82–95k  ·  posted 2d ago  ·  via LinkedIn",
  matchScore: 92,
  reasoning:
    "Why I picked it: B2B SaaS, design systems leadership, EU-friendly time zone, salary in band. Mentions ex-CRM domain — strong overlap with your Pipedrive experience.",
  chips: ["Design systems", "B2B SaaS", "Remote EU", "€82–95k", "Figma"],
};

export const northwindMatch: JobMatch = {
  id: "northwind",
  title: "Senior Product Designer — Northwind",
  company: "Northwind",
  meta: "Remote (EU)  ·  €78–92k  ·  posted 4d ago  ·  via Welcome to the Jungle",
  matchScore: 88,
  reasoning:
    "B2B fintech with a strong design culture, EU-friendly hours, salary in band. Slight stretch on the analytics-tooling experience requirement.",
  chips: ["B2B SaaS", "Fintech", "Remote EU", "€78–92k", "Figma"],
};

export const lattaMatch: JobMatch = {
  id: "latta",
  title: "Senior Product Designer — Latta",
  company: "Latta",
  meta: "Remote (EU)  ·  €72–88k  ·  posted 1d ago  ·  via Otta",
  matchScore: 86,
  reasoning:
    "Design-led startup in the productivity space, hiring for a senior IC. Salary at the lower bound of your range.",
  chips: ["B2B SaaS", "Productivity", "Remote EU", "€72–88k"],
};

export const orbitMatch: JobMatch = {
  id: "orbit",
  title: "Senior Product Designer — Orbit",
  company: "Orbit",
  meta: "Remote (EU)  ·  €80–94k  ·  posted 3d ago  ·  via LinkedIn",
  matchScore: 85,
  reasoning:
    "Community-platform B2B, design system rebuild in flight. Good narrative fit for your Pipedrive systems work.",
  chips: ["B2B SaaS", "Communities", "Remote EU", "€80–94k", "Design ops"],
};

export const initialJob: JobRun = {
  id: "1023",
  automation: "Find & apply to a job",
  title: "Find & apply to a job",
  subtitle: "Senior Product Designer  ·  Remote, EU  ·  €70–95k  ·  started 4 min ago",
  status: "running",
  startedLabel: "12:18 today",
  runtime: "00:04:21",
  applicationsSubmitted: [],
  steps: [
    {
      id: "s1",
      index: 1,
      label: "Searched LinkedIn & Welcome to the Jungle",
      detail: "Searched 3 boards using your saved filters. Returned 47 candidate postings.",
      status: "done",
      toolCalls: [{ name: "web.search", args: '"senior product designer remote eu"' }],
    },
    {
      id: "s2",
      index: 2,
      label: "Filtered by your requirements",
      detail:
        "Removed roles outside €70–95k, non-EU time zones, on-site requirements, and stale postings (>14d). 12 candidates remained.",
      status: "done",
    },
    {
      id: "s3",
      index: 3,
      label: "Ranked candidates by fit",
      detail:
        "Scored remaining roles against your \"About me\" context. Top 4 above 85% match.",
      status: "queued",
    },
    {
      id: "s4",
      index: 4,
      label: "Confirm top match before tailoring CV",
      status: "queued",
      hitl: {
        kind: "approve_job_match",
        title: "Approve this job match before applying",
        pausedFor: "paused 38s",
        jobMatch: acmeMatch,
      },
    },
    {
      id: "s5",
      index: 5,
      label: "Tailor CV & cover letter",
      detail: "Will adapt your base resume to the role's keywords once approved.",
      status: "queued",
    },
    {
      id: "s6",
      index: 6,
      label: "Submit application",
      detail:
        "Submits via LinkedIn Easy Apply or company ATS. Will pause again if a custom field needs your input.",
      status: "queued",
    },
  ],
};

export const completedJob: JobRun = {
  ...initialJob,
  status: "completed",
  runtime: "00:08:14",
  applicationsSubmitted: [acmeMatch, northwindMatch, lattaMatch, orbitMatch],
  steps: initialJob.steps.map((s) => ({ ...s, status: "done" as const })),
};
