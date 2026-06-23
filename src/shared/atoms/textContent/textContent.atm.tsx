import type { TDisplayContentProps } from "./textContent.types";
export function DisplayTextContent({
  content,
  className = "text-primary",
}: TDisplayContentProps) {
  return (
    <div
      className={`max-w-xl px-4 py-3 text-base font-semibold leading-7 md:px-8 md:py-4 md:text-xl ${className}`}
    >
      <p className="whitespace-pre-line">{content}</p>
    </div>
  );
}
