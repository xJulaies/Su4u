import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "../../../features/dashboard/components/templates/dashboardLayout/dashboard.layout.tpl";

export const Route = createFileRoute("/_authenticated/_dashboard/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return <DashboardLayout />;
}
