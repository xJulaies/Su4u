import { DisplayTextContent } from "../../../../shared/atoms/textContent/textContent.atm";
import type { TSectionProps } from "../../../../shared/lib/types/section.types";

export function RulesSection({
  content,
  imageUrl,
  sectionClassName,
  contentClassName,
  textClassName,
  imageWrapperClassName = "justify-self-end",
}: TSectionProps) {
  return (
    <section className={sectionClassName}>
      <div className={contentClassName}>
        <DisplayTextContent content={content} className={textClassName} />

        {imageUrl && (
          <div className={imageWrapperClassName}>
            <img
              src={imageUrl}
              alt=""
              className="w-full max-w-lg rounded-lg object-cover"
            />
          </div>
        )}
      </div>
    </section>
  );
}
