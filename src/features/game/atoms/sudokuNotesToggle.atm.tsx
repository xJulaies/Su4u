import styles from "../styles/sudoku.module.css";
import type { TSudokuNotesToggleProps } from "../types/sudoku.types";

export function SudokuNotesToggle({
  isActive,
  onClick,
}: TSudokuNotesToggleProps) {
  return (
    <button
      type="button"
      className={
        isActive
          ? `${styles.notesToggle} ${styles.notesToggleActive}`
          : styles.notesToggle
      }
      onClick={onClick}
    >
      {isActive ? "Notes on" : "Notes off"}
    </button>
  );
}
