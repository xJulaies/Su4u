import { useState } from "react";
import { PublicLayout } from "../../../shared/templates/publicLayout/public.layout.tpl";
import { SudokuBoard } from "../organisms/sudokuBoard.org";
import styles from "../styles/sudoku.module.css";
import { SudokuNotesToggle } from "../atoms/sudokuNotesToggle.atm";
import { SudokuNumberPad } from "../molecules/sudokuNumberPad.mol";
import { SudokuNewGameButton } from "../atoms/sudokuNewGameBtn.atm";
import { useSudokuGame } from "../hooks/useSudokuGame";
import { SudokuStats } from "../molecules/sudokuStats.mol";
import { SudokuWinDialog } from "../molecules/sudokuWinDialog.mol";
import { SudokuNewGameDialog } from "../molecules/sudokuNewGameDialog.mol";

export function SudokuLayout() {
  const [isGameDialogOpen, setIsGameDialogOpen] = useState(false);
  const {
    board,
    selectedCell,
    notesMode,
    handleGenerateBoard,
    handleCellClick,
    handleNotesToggle,
    handleNumber,
    elapsedSeconds,
    isCompleted,
    completedValues,
    hasProgress,
    currentDifficulty,
    handleRestartBoard,
  } = useSudokuGame();

  function handleRestart() {
    handleRestartBoard();
    setIsGameDialogOpen(false);
  }

  function handleNewGame(difficulty: typeof currentDifficulty) {
    handleGenerateBoard(difficulty);
    setIsGameDialogOpen(false);
  }

  return (
    <PublicLayout>
      <section className={styles.layout}>
        <section className={styles.gameShell}>
          <SudokuWinDialog
            isOpen={isCompleted}
            elapsedSeconds={elapsedSeconds}
            onPlayAgain={() => handleGenerateBoard(currentDifficulty)}
          />
          {isGameDialogOpen && (
            <SudokuNewGameDialog
              hasProgress={hasProgress}
              onClose={() => setIsGameDialogOpen(false)}
              onRestart={handleRestart}
              onNewGame={handleNewGame}
            />
          )}
          <section className={styles.playArea}>
            <SudokuStats elapsedSeconds={elapsedSeconds} />
            <SudokuBoard
              board={board}
              selectedCell={selectedCell}
              onCellClick={handleCellClick}
            />

            <section className={styles.controls}>
              <SudokuNotesToggle
                isActive={notesMode}
                onClick={handleNotesToggle}
              />
              <SudokuNumberPad
                completedValues={completedValues}
                onNumberClick={handleNumber}
              />
            </section>
          </section>

          <aside className={styles.sidePanel}>
            <SudokuNewGameButton
              onClick={() => setIsGameDialogOpen(true)}
            />
          </aside>
        </section>
      </section>
    </PublicLayout>
  );
}
