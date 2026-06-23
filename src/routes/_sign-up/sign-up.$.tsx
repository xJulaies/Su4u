import { createFileRoute } from "@tanstack/react-router";
import { ClerkSignUp } from "../../features/auth/components/templates/signUpLayout/signUp.layout.tpl";

export const Route = createFileRoute("/_sign-up/sign-up/$")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ClerkSignUp />;
}
