import { PublicLayout } from "../../../shared/templates/publicLayout/public.layout.tpl";
import { SudokuBoard } from "../organisms/sudokuBoard.org";
import styles from "../styles/sudoku.module.css";
import { SudokuNotesToggle } from "../atoms/sudokuNotesToggle.atm";
import { SudokuNumberPad } from "../molecules/sudokuNumberPad.mol";
import { GenerateSudokuBtn } from "../atoms/sudokuGenerateBtn.atm";
import { useSudokuGame } from "../hooks/useSudokuGame";
import { SudokuStats } from "../molecules/sudokuStats.mol";
import { SudokuWinDialog } from "../molecules/sudokuWinDialog.mol";

export function SudokuLayout() {
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
    handleRestartBoard,
  } = useSudokuGame();

  return (
    <PublicLayout>
      <main className={styles.layout}>
        <section className={styles.gameShell}>
          <SudokuWinDialog
            isOpen={isCompleted}
            elapsedSeconds={elapsedSeconds}
            onPlayAgain={handleRestartBoard}
          />
          <section className={styles.playArea}>
            <SudokuStats elapsedSeconds={elapsedSeconds} />
            <SudokuBoard
              board={board}
              selectedCell={selectedCell}
              onCellClick={handleCellClick}
            />

            <section className={styles.controls}>
              <SudokuNumberPad onNumberClick={handleNumber} />
              <SudokuNotesToggle
                isActive={notesMode}
                onClick={handleNotesToggle}
              />
            </section>
          </section>

          <aside className="flex flex-col gap-4">
            <GenerateSudokuBtn
              onClick={() => handleGenerateBoard("easy")}
              text="Generate easy board"
            />
            <GenerateSudokuBtn
              onClick={() => handleGenerateBoard("medium")}
              text="Generate medium board"
            />
            <GenerateSudokuBtn
              onClick={() => handleGenerateBoard("hard")}
              text="Generate hard board"
            />
          </aside>
        </section>
      </main>
    </PublicLayout>
  );
}
