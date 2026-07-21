import { SudokuCell } from "../molecules/sudokuCell.mol";
import { isPeerPosition } from "../lib/sudokuBoardState";
import styles from "../styles/sudoku.module.css";
import type { TSudokuBoardProps } from "../types/sudoku.types";

export function SudokuBoard({
  board,
  selectedCell,
  onCellClick,
}: TSudokuBoardProps) {
  const selectedValue = selectedCell
    ? board[selectedCell.row][selectedCell.col].value
    : null;

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
          const isPeer = selectedCell
            ? isPeerPosition(selectedCell, { row: rowIndex, col: colIndex })
            : false;
          const isMatchingValue =
            selectedValue !== null && cell.value === selectedValue;

          return (
            <SudokuCell
              key={`${rowIndex}-${colIndex}`}
              cell={cell}
              isSelected={isSelected}
              isPeer={isPeer}
              isMatchingValue={isMatchingValue}
              rowIndex={rowIndex}
              colIndex={colIndex}
            />
          );
        }),
      )}
    </div>
  );
}
