import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "../../../shared/templates/publicLayout/public.layout.tpl";

export const Route = createFileRoute("/_authenticated/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PublicLayout>
      <h1>Dashboard</h1>
    </PublicLayout>
  );
}
