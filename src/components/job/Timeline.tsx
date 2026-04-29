import { forwardRef } from "react";
import type { Step as StepType } from "../../data/types";
import { Step } from "./Step";

type Props = {
  steps: StepType[];
  hitlRef?: React.Ref<HTMLDivElement>;
  onApprove?: (note?: string) => void;
  onSkip?: () => void;
};

export const Timeline = forwardRef<HTMLDivElement, Props>(function Timeline(
  { steps, hitlRef, onApprove, onSkip },
  ref,
) {
  return (
    <div ref={ref} className="timeline" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {steps.map((s, i) => (
        <Step
          key={s.id}
          step={s}
          isLast={i === steps.length - 1}
          onApprove={onApprove}
          onSkip={onSkip}
          hitlRef={s.status === "awaiting_input" ? hitlRef : undefined}
        />
      ))}
    </div>
  );
});
