import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ClerkProvider } from "@clerk/react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      signInUrl="/Su4u/sign-in"
      signUpUrl="/Su4u/sign-up"
      signInFallbackRedirectUrl="/Su4u/dashboard"
      signUpFallbackRedirectUrl="/Su4u/dashboard"
      signInForceRedirectUrl="/Su4u/dashboard"
      signUpForceRedirectUrl="/Su4u/dashboard"
      afterSignOutUrl="/Su4u"
    >
      <App />
    </ClerkProvider>
  </StrictMode>,
);
