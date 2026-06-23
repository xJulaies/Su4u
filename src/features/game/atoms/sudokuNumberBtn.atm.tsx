import styles from "../styles/sudoku.module.css";
import type { TSudokuNumberBtnProps } from "../types/sudoku.types";

export function SudokuNumberBtn({ value, onClick }: TSudokuNumberBtnProps) {
  return (
    <button
      type="button"
      className={styles.numberButton}
      onClick={() => onClick(value)}
    >
      {value}
    </button>
  );
}
