import { Link } from "@tanstack/react-router";

import type { TButtonTextProps } from "../../lib/types/button.types";

export function SignInLink({ text }: TButtonTextProps) {
  return (
    <Link
      to="/sign-in/$"
      className="inline-flex shrink-0 cursor-pointer whitespace-nowrap rounded-md border border-border bg-surface-muted px-3 py-2 text-sm font-medium text-text-muted transition hover:text-primary"
    >
      {text}
    </Link>
  );
}
