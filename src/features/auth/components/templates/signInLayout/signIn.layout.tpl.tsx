import { PublicLayout } from "../../../../../shared/templates/publicLayout/public.layout.tpl";
import { SignIn } from "@clerk/react";

export function ClerkSignIn() {
  return (
    <PublicLayout>
      <div className="flex flex-col justify-center items-center p-8">
        <SignIn
          routing="path"
          path="/Su4u/sign-in"
          signUpUrl="/Su4u/sign-up"
          forceRedirectUrl="/Su4u/dashboard"
        />
      </div>
    </PublicLayout>
  );
}
