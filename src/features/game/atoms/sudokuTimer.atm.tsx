import type { TSudokuTimerProps } from "../types/sudoku.types";

export function SudokuTimer({ elapsedSeconds }: TSudokuTimerProps) {
  const minutes = Math.floor(elapsedSeconds / 60);
  const seconds = elapsedSeconds % 60;

  const timerLabel = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return <span>Time: {timerLabel}</span>;
}
