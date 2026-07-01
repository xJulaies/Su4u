import { PublicLayout } from "../../../../../shared/templates/publicLayout/public.layout.tpl";
import { SignUp } from "@clerk/react";

export function ClerkSignUp() {
  return (
    <PublicLayout>
      <div className="flex flex-col justify-center items-center p-8">
        <SignUp
          routing="path"
          path="/Su4u/sign-up"
          signInUrl="/Su4u/sign-in"
          forceRedirectUrl="/Su4u/dashboard"
        />
      </div>
    </PublicLayout>
  );
}
