import { SudokuNotes } from "../atoms/sudokuNotes.atm";
import { isSolvedCell } from "../lib/sudokuBoardState";
import styles from "../styles/sudoku.module.css";
import type { TSudokuCellProps } from "../types/sudoku.types";

export function SudokuCell({
  cell,
  isSelected,
  isPeer,
  isMatchingValue,
  rowIndex,
  colIndex,
}: TSudokuCellProps) {
  const cellClassName = [
    styles.cell,
    !cell.isGiven && !isSolvedCell(cell) ? styles.editableCell : "",
    !cell.isGiven && isSolvedCell(cell) ? styles.solvedCell : "",
    isPeer ? styles.peerCell : "",
    isMatchingValue ? styles.matchingValueCell : "",
    isSelected ? styles.selectedCell : "",
    cell.isError ? styles.errorCell : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      className={cellClassName}
      data-row={rowIndex}
      data-col={colIndex}
      data-peer={isPeer || undefined}
      data-matching-value={isMatchingValue || undefined}
      aria-pressed={isSelected}
    >
      {cell.value ? cell.value : <SudokuNotes notes={cell.notes} />}
    </button>
  );
}
