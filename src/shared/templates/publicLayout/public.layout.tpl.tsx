import { PublicFooter } from "../../molecules/publicFooter/public.footer.mol";
import { PublicNavbar } from "../../molecules/publicNavbar/public.navbar.mol";
import type { TPublicLayoutProps } from "./public.layout.types";

export function PublicLayout({ children }: TPublicLayoutProps) {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <PublicNavbar />
        <main className="flex flex-1 flex-col">{children}</main>
        <PublicFooter />
      </div>
    </>
  );
}
