import { createFileRoute } from "@tanstack/react-router";
import { ClerkSignIn } from "../../features/auth/components/templates/signInLayout/signIn.layout.tpl";

export const Route = createFileRoute("/_sign-in/sign-in/$")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ClerkSignIn />;
}
