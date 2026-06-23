import { createFileRoute } from "@tanstack/react-router";
import { RulesLayout } from "../../features/rules/components/templates/rulesLayout/rules.layout.tpl";

export const Route = createFileRoute("/_rules/rules")({
  component: RouteComponent,
});

function RouteComponent() {
  return <RulesLayout />;
}
