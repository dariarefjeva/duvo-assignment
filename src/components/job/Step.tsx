import { forwardRef } from "react";
import type { Step as StepType } from "../../data/types";
import { HITLCard } from "./HITLCard";
import "./Step.css";

type Props = {
  step: StepType;
  isLast: boolean;
  onApprove?: (note?: string) => void;
  onSkip?: () => void;
  hitlRef?: React.Ref<HTMLDivElement>;
};

export const Step = forwardRef<HTMLDivElement, Props>(function Step(
  { step, isLast, onApprove, onSkip, hitlRef },
  ref,
) {
  const tag = (() => {
    switch (step.status) {
      case "done":           return <span className="step__tag step__tag--green">Done</span>;
      case "running":        return <span className="step__tag step__tag--violet">Running</span>;
      case "awaiting_input": return <span className="step__tag step__tag--amber">Awaiting input</span>;
      case "skipped":        return <span className="step__tag step__tag--neutral">Skipped</span>;
      case "failed":         return <span className="step__tag step__tag--neutral">Failed</span>;
      default:               return null;
    }
  })();

  const showHitl = step.status === "awaiting_input" && step.hitl;

  return (
    <div ref={ref} className={`step step--${step.status}`}>
      <div className="step__rail">
        <div className={`step__node step__node--${step.status}`}>
          {step.status === "done" ? (
            <Check />
          ) : step.status === "running" ? (
            <span className="step__spinner" />
          ) : (
            <span className="step__num">{step.index}</span>
          )}
        </div>
        {!isLast && <div className="step__line" />}
      </div>

      <div className="step__content">
        <div className="step__title-row">
          <h3 className="step__title">{step.label}</h3>
          {tag}
        </div>
        {step.detail && <p className="step__detail">{step.detail}</p>}
        {step.toolCalls && step.toolCalls.length > 0 && (
          <div className="step__tools">
            {step.toolCalls.map((tc, i) => (
              <div className="step__tool" key={i}>
                <code className="step__tool-name">{tc.name}</code>
                <code className="step__tool-args">{tc.args}</code>
              </div>
            ))}
          </div>
        )}
        {showHitl && step.hitl && onApprove && onSkip && (
          <HITLCard
            ref={hitlRef as React.Ref<HTMLDivElement>}
            hitl={step.hitl}
            onApprove={onApprove}
            onSkip={onSkip}
          />
        )}
      </div>
    </div>
  );
});

function Check() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
      <path
        d="M5 12.5l4.2 4.2L19 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
