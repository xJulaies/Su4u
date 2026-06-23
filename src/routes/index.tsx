import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "../shared/templates/publicLayout/public.layout.tpl";
import { PublicHero } from "../features/home/components/hero/molecules/public.hero.mol";
import heroBackground from "../assets/images/hero/hero.background.png";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PublicLayout>
      <PublicHero title="Welcome to Su4u" backgroundImageUrl={heroBackground} />
    </PublicLayout>
  );
}
