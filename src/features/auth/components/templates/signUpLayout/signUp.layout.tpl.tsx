import { PublicLayout } from "../../../../../shared/templates/publicLayout/public.layout.tpl";
import { SignUp } from "@clerk/react";

export function ClerkSignUp() {
  return (
    <PublicLayout>
      <div className="flex flex-col justify-center items-center p-8">
        <SignUp />
      </div>
    </PublicLayout>
  );
}
