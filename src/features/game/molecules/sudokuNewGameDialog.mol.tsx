import { useEffect, useRef, useState } from "react";
import styles from "../styles/sudoku.module.css";
import type {
  TDifficulty,
  TSudokuNewGameDialogProps,
} from "../types/sudoku.types";

type TPendingGameAction =
  | { type: "restart" }
  | { type: "newGame"; difficulty: TDifficulty };

export function SudokuNewGameDialog({
  hasProgress,
  onClose,
  onRestart,
  onNewGame,
}: TSudokuNewGameDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const restartButtonRef = useRef<HTMLButtonElement>(null);
  const keepPlayingButtonRef = useRef<HTMLButtonElement>(null);
  const [pendingAction, setPendingAction] =
    useState<TPendingGameAction | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (
      !returnFocusRef.current &&
      document.activeElement instanceof HTMLElement
    ) {
      returnFocusRef.current = document.activeElement;
    }

    if (!dialog.open) {
      if (typeof dialog.showModal === "function") {
        dialog.showModal();
      } else {
        dialog.setAttribute("open", "");
      }
    }

    return () => {
      if (dialog.open) {
        if (typeof dialog.close === "function") {
          dialog.close();
        } else {
          dialog.removeAttribute("open");
        }
      }

      returnFocusRef.current?.focus();
    };
  }, []);

  useEffect(() => {
    if (pendingAction) {
      keepPlayingButtonRef.current?.focus();
      return;
    }

    restartButtonRef.current?.focus();
  }, [pendingAction]);

  function requestAction(action: TPendingGameAction) {
    if (hasProgress) {
      setPendingAction(action);
      return;
    }

    executeAction(action);
  }

  function executeAction(action: TPendingGameAction) {
    if (action.type === "restart") {
      onRestart();
      return;
    }

    onNewGame(action.difficulty);
  }

  function handleCancel(event: React.SyntheticEvent<HTMLDialogElement>) {
    event.preventDefault();

    if (pendingAction) {
      setPendingAction(null);
      return;
    }

    onClose();
  }

  return (
    <dialog
      ref={dialogRef}
      className={styles.gameDialog}
      aria-labelledby="new-game-dialog-title"
      onCancel={handleCancel}
    >
      {pendingAction ? (
        <>
          <h2 id="new-game-dialog-title" className={styles.gameDialogTitle}>
            Discard current progress?
          </h2>
          <p className={styles.gameDialogText}>
            Your entries and notes from this game will be lost.
          </p>
          <div className={styles.gameDialogActions}>
            <button
              ref={keepPlayingButtonRef}
              type="button"
              className={styles.dialogSecondaryButton}
              onClick={() => setPendingAction(null)}
            >
              Keep playing
            </button>
            <button
              type="button"
              className={styles.dialogPrimaryButton}
              onClick={() => executeAction(pendingAction)}
            >
              {pendingAction.type === "restart"
                ? "Restart game"
                : `Start ${pendingAction.difficulty} game`}
            </button>
          </div>
        </>
      ) : (
        <>
          <h2 id="new-game-dialog-title" className={styles.gameDialogTitle}>
            New Game
          </h2>
          <button
            ref={restartButtonRef}
            type="button"
            className={styles.dialogSecondaryButton}
            onClick={() => requestAction({ type: "restart" })}
          >
            Restart current game
          </button>
          <div className={styles.difficultySelection}>
            <p className={styles.gameDialogText}>Choose difficulty</p>
            <div className={styles.difficultyButtons}>
              {(["easy", "medium", "hard"] as const).map((difficulty) => (
                <button
                  key={difficulty}
                  type="button"
                  className={styles.dialogPrimaryButton}
                  onClick={() =>
                    requestAction({ type: "newGame", difficulty })
                  }
                >
                  {difficulty[0].toUpperCase() + difficulty.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <button
            type="button"
            className={styles.dialogTextButton}
            onClick={onClose}
          >
            Cancel
          </button>
        </>
      )}
    </dialog>
  );
}
