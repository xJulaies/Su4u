import styles from "../styles/sudoku.module.css";
import type { TSudokuNumberBtnProps } from "../types/sudoku.types";

export function SudokuNumberBtn({
  value,
  isDisabled,
  onClick,
}: TSudokuNumberBtnProps) {
  return (
    <button
      type="button"
      className={`${styles.numberButton} ${isDisabled ? styles.completedNumberButton : ""}`}
      disabled={isDisabled}
      aria-label={isDisabled ? `${value} complete` : `${value}`}
      onClick={() => onClick(value)}
    >
      {value}
    </button>
  );
}
