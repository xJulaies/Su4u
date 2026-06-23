import { createFileRoute } from "@tanstack/react-router";
import { ImpressumLayout } from "../../features/impressum/components/templates/impressum.layout.tpl";

export const Route = createFileRoute("/_impressum/impressum")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ImpressumLayout />;
}
