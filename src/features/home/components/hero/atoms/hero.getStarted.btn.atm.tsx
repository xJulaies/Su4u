import { Link } from "@tanstack/react-router";
import type { THeroBtnProps } from "../types/hero.btn.types";

export function GetStartedBtn({ url, label }: THeroBtnProps) {
  return (
    <Link
      className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-content shadow-lg shadow-primary/25 transition hover:bg-accent hover:text-accent-content focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-transparent"
      to={url}
    >
      {label}
    </Link>
  );
}
