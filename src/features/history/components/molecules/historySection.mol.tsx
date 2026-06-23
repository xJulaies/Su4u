import { DisplayTextContent } from "../../../../shared/atoms/textContent/textContent.atm";
import type { TSectionProps } from "../../../../shared/lib/types/section.types";

export function HistorySection({
  content,
  imageUrl,
  sectionClassName,
  contentClassName,
  textClassName,
  reverse,
}: TSectionProps) {
  const textElement = (
    <DisplayTextContent content={content} className={textClassName} />
  );

  const imageElement = imageUrl ? (
    <div>
      <img
        src={imageUrl}
        alt=""
        className="w-full max-w-sm rounded-lg object-cover"
      />
    </div>
  ) : null;

  return (
    <section className={sectionClassName}>
      <div className={contentClassName}>
        {reverse ? (
          <>
            {imageElement}
            {textElement}
          </>
        ) : (
          <>
            {textElement}
            {imageElement}
          </>
        )}
      </div>
    </section>
  );
}
