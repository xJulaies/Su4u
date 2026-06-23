import { createFileRoute } from "@tanstack/react-router";
import { AboutLayout } from "../../features/about/components/templates/about.layout.tpl";

export const Route = createFileRoute("/_about/about")({
  component: RouteComponent,
});

function RouteComponent() {
  return <AboutLayout />;
}
