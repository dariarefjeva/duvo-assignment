export type JobStatus =
  | "draft"
  | "queued"
  | "running"
  | "awaiting_input"
  | "completed"
  | "failed"
  | "cancelled";

export type StepStatus =
  | "queued"
  | "running"
  | "awaiting_input"
  | "done"
  | "skipped"
  | "failed";

export type JobMatch = {
  id: string;
  title: string;
  company: string;
  meta: string;
  matchScore: number;
  reasoning: string;
  chips: string[];
};

export type HITLApproveJobMatch = {
  kind: "approve_job_match";
  title: string;
  jobMatch: JobMatch;
  pausedFor: string;
};

export type HITL = HITLApproveJobMatch;

export type ToolCall = {
  name: string;
  args: string;
};

export type Step = {
  id: string;
  index: number;
  label: string;
  detail?: string;
  status: StepStatus;
  toolCalls?: ToolCall[];
  hitl?: HITL;
};

export type JobRun = {
  id: string;
  automation: string;
  title: string;
  subtitle: string;
  status: JobStatus;
  startedLabel: string;
  runtime: string;
  steps: Step[];
  applicationsSubmitted: JobMatch[];
};
