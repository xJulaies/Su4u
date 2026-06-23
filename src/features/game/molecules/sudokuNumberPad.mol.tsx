import { SudokuNumberBtn } from "../atoms/sudokuNumberBtn.atm";
import styles from "../styles/sudoku.module.css";
import type { TSudokuNumberPadProps } from "../types/sudoku.types";

export function SudokuNumberPad({ onNumberClick }: TSudokuNumberPadProps) {
  const sudokuNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

  return (
    <div className={styles.numberPad}>
      {sudokuNumbers.map((number) => (
        <SudokuNumberBtn key={number} value={number} onClick={onNumberClick} />
      ))}
    </div>
  );
}
