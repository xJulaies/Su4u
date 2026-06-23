import { createFileRoute } from "@tanstack/react-router";
import { HistoryLayout } from "../../features/history/components/templates/historyLayout/history.layout.tpl";

export const Route = createFileRoute("/_history/history")({
  component: RouteComponent,
});

function RouteComponent() {
  return <HistoryLayout />;
}
