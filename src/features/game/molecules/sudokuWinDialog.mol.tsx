import type { TSudokuWinDialogProps } from "../types/sudoku.types";
import styles from "../styles/sudoku.module.css";

export function SudokuWinDialog({
  isOpen,
  elapsedSeconds,
  onPlayAgain,
}: TSudokuWinDialogProps) {
  if (!isOpen) return null;

  const minutes = Math.floor(elapsedSeconds / 60);
  const seconds = elapsedSeconds % 60;

  const timerLabel = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return (
    <div className={styles.dialogOverlay} role="presentation">
      <div
        className={styles.winDialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="sudoku-win-title"
      >
        <h2 id="sudoku-win-title" className={styles.winDialogTitle}>
          You win!
        </h2>
        <p className={styles.winDialogText}>Time: {timerLabel}</p>
        <button
          type="button"
          className={styles.winDialogButton}
          onClick={onPlayAgain}
        >
          Play again
        </button>
      </div>
    </div>
  );
}
