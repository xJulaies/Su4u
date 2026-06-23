import styles from "../styles/sudoku.module.css";
import type { TSudokuGenerateBtnProps } from "../types/sudoku.types";

export function GenerateSudokuBtn({ text, onClick }: TSudokuGenerateBtnProps) {
  return (
    <button type="button" className={styles.generateButton} onClick={onClick}>
      {text}
    </button>
  );
}
