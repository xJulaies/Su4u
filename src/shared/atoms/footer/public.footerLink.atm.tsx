import { Link } from "@tanstack/react-router";
import type { TLinkProps } from "../../lib/types/link.types";

export function FooterLink({ url, label }: TLinkProps) {
  return (
    <Link className="hover:text-primary" to={url}>
      {label}
    </Link>
  );
}
