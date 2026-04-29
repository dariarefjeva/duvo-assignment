import { useEffect, useReducer } from "react";
import type { JobRun, Step, StepStatus } from "../data/types";
import { initialJob, acmeMatch, northwindMatch, lattaMatch, orbitMatch } from "../data/mockJob";

type Action =
  | { type: "advance" }
  | { type: "approve"; note?: string }
  | { type: "skip" }
  | { type: "tick" }
  | { type: "reset" };

type State = {
  job: JobRun;
  cursor: number; // index of next step to advance
  awaiting: boolean;
};

const initialState: State = {
  job: structuredClone(initialJob),
  cursor: 2, // s1 + s2 already done
  awaiting: false,
};

function setStep(steps: Step[], idx: number, patch: Partial<Step>): Step[] {
  return steps.map((s, i) => (i === idx ? { ...s, ...patch } : s));
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "advance": {
      if (state.awaiting) return state;
      const idx = state.cursor;
      if (idx >= state.job.steps.length) return state;

      const step = state.job.steps[idx];

      // Step 4 (index 3) — pause for HITL
      if (step.hitl) {
        return {
          ...state,
          job: {
            ...state.job,
            status: "awaiting_input",
            steps: setStep(state.job.steps, idx, { status: "awaiting_input" as StepStatus }),
          },
          awaiting: true,
        };
      }

      // Otherwise mark running, then done in next tick
      return {
        ...state,
        job: {
          ...state.job,
          status: "running",
          steps: setStep(state.job.steps, idx, { status: "running" as StepStatus }),
        },
      };
    }

    case "tick": {
      // promote any 'running' step to 'done' and advance cursor
      const idx = state.cursor;
      if (idx >= state.job.steps.length) return state;
      const step = state.job.steps[idx];
      if (step.status !== "running") return state;

      const isLast = idx === state.job.steps.length - 1;
      const nextSteps = setStep(state.job.steps, idx, { status: "done" as StepStatus });

      return {
        ...state,
        cursor: idx + 1,
        job: {
          ...state.job,
          steps: nextSteps,
          status: isLast ? "completed" : "running",
          applicationsSubmitted: isLast
            ? [acmeMatch, northwindMatch, lattaMatch, orbitMatch]
            : state.job.applicationsSubmitted,
          runtime: isLast ? "00:08:14" : state.job.runtime,
        },
      };
    }

    case "approve": {
      const idx = state.cursor;
      const step = state.job.steps[idx];
      if (!step || step.status !== "awaiting_input") return state;
      // mark current as done, move to next, set running
      const stepsAfter = setStep(state.job.steps, idx, { status: "done" as StepStatus });
      return {
        ...state,
        cursor: idx + 1,
        awaiting: false,
        job: { ...state.job, status: "running", steps: stepsAfter },
      };
    }

    case "skip": {
      const idx = state.cursor;
      const step = state.job.steps[idx];
      if (!step || step.status !== "awaiting_input") return state;
      const stepsAfter = setStep(state.job.steps, idx, { status: "skipped" as StepStatus });
      return {
        ...state,
        cursor: idx + 1,
        awaiting: false,
        job: { ...state.job, status: "running", steps: stepsAfter },
      };
    }

    case "reset":
      return { ...initialState, job: structuredClone(initialJob) };

    default:
      return state;
  }
}

export function useJobSimulation() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Auto-play loop: every ~1.6s either advance or tick a running step.
  useEffect(() => {
    if (state.awaiting) return;
    if (state.job.status === "completed") return;

    const idx = state.cursor;
    const step = state.job.steps[idx];
    if (!step) return;

    let timeout: number;
    if (step.status === "queued") {
      timeout = window.setTimeout(() => dispatch({ type: "advance" }), 900);
    } else if (step.status === "running") {
      timeout = window.setTimeout(() => dispatch({ type: "tick" }), 1500);
    } else {
      timeout = window.setTimeout(() => dispatch({ type: "advance" }), 600);
    }
    return () => window.clearTimeout(timeout);
  }, [state]);

  return {
    job: state.job,
    awaiting: state.awaiting,
    approve: (note?: string) => dispatch({ type: "approve", note }),
    skip: () => dispatch({ type: "skip" }),
    reset: () => dispatch({ type: "reset" }),
  };
}
