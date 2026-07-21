import styles from "../styles/sudoku.module.css";
import type { TSudokuNewGameBtnProps } from "../types/sudoku.types";

export function SudokuNewGameButton({
  onClick,
}: TSudokuNewGameBtnProps) {
  return (
    <button type="button" className={styles.newGameButton} onClick={onClick}>
      New Game
    </button>
  );
}
