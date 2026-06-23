import { DisplayTextContent } from "../../../../shared/atoms/textContent/textContent.atm";
import type { TSectionProps } from "../../../../shared/lib/types/section.types";

export function ImpressumSection({
  content,
  sectionClassName,
  contentClassName,
  textClassName,
}: TSectionProps) {
  return (
    <section className={sectionClassName}>
      <div className={contentClassName}>
        <DisplayTextContent content={content} className={textClassName} />
      </div>
    </section>
  );
}
