import { routeTree } from "./routeTree.gen";
import { createRouter, RouterProvider } from "@tanstack/react-router";

import { useAuth } from "@clerk/react";
import type { useAuth as TUseAuth } from "@clerk/react";

import "./App.css";

export type RouterContext = {
  auth: ReturnType<typeof TUseAuth>;
};

const router = createRouter({
  routeTree,
  context: {
    auth: undefined!,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  const auth = useAuth();

  if (!auth.isLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <RouterProvider router={router} context={{ auth }} />
    </>
  );
}

export default App;
