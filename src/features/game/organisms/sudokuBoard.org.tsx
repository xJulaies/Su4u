import { SudokuCell } from "../molecules/sudokuCell.mol";
import styles from "../styles/sudoku.module.css";
import type { TSudokuBoardProps } from "../types/sudoku.types";

export function SudokuBoard({
  board,
  selectedCell,
  onCellClick,
}: TSudokuBoardProps) {
  function handleBoardClick(event: React.MouseEvent<HTMLDivElement>) {
    const cellElement = (event.target as HTMLElement).closest(
      "[data-row][data-col]",
    );

    if (!cellElement) return;

    const row = Number(cellElement.getAttribute("data-row"));
    const col = Number(cellElement.getAttribute("data-col"));

    onCellClick(row, col);
  }

  return (
    <div className={styles.board} onClick={handleBoardClick}>
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const isSelected =
            selectedCell?.row === rowIndex && selectedCell?.col === colIndex;

          return (
            <SudokuCell
              key={`${rowIndex}-${colIndex}`}
              cell={cell}
              isSelected={isSelected}
              rowIndex={rowIndex}
              colIndex={colIndex}
            />
          );
        }),
      )}
    </div>
  );
}
