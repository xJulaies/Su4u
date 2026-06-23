import type { THeaderProps } from "../../../../../shared/atoms/headers/header.types";

export function HeroHeader({ title }: THeaderProps) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-semibold text-hero-text md:text-4xl">
        {title}
      </h1>
    </div>
  );
}
