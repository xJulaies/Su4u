import { Link } from "@tanstack/react-router";
import type { TButtonTextProps } from "../../lib/types/button.types";

export function ReturnHomeButton({ text }: TButtonTextProps) {
  return (
    <div>
      <Link
        to="/"
        className="rounded-md px-3 py-2 text-xl font-semibold text-primary hover:bg-surface-muted"
      >
        {text}
      </Link>
    </div>
  );
}
