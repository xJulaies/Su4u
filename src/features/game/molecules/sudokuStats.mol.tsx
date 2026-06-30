import { SudokuTimer } from "../atoms/sudokuTimer.atm";
import styles from "../styles/sudoku.module.css";
import type { TSudokuStatsProps } from "../types/sudoku.types";

export function SudokuStats({ elapsedSeconds }: TSudokuStatsProps) {
  return (
    <div className={styles.stats}>
      <div className={styles.statItem}>
        <SudokuTimer elapsedSeconds={elapsedSeconds} />
      </div>
    </div>
  );
}
