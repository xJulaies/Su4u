import { FooterLink } from "../../atoms/footer/public.footerLink.atm";
import { DisplayIcon } from "../../atoms/icon/icon.atm";

export function PublicFooter() {
  return (
    <footer className="surface-wave border-t border-border bg-surface">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 py-8 text-center text-sm text-primary md:flex-row md:justify-between md:text-left md:text-primary">
        <div className="flex flex-col items-center gap-2 md:flex-row">
          <DisplayIcon IconClassName="h-14 w-auto object-contain md:h-20" />
          <span>
            (c) 2026 Su4u. A React learning project built by xJulaies.
          </span>
        </div>

        <nav className="flex gap-4">
          <FooterLink url="/impressum" label="Impressum" />
          <FooterLink url="/about" label="About" />
        </nav>
      </div>
    </footer>
  );
}
