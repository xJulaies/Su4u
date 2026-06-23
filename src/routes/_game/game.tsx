import { createFileRoute } from "@tanstack/react-router";
import { SudokuLayout } from "../../features/game/templates/sudokuLayout.tpl";

export const Route = createFileRoute("/_game/game")({
  component: RouteComponent,
});

function RouteComponent() {
  return <SudokuLayout />;
}
