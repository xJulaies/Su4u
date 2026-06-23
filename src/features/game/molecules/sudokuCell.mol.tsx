import { SudokuNotes } from "../atoms/sudokuNotes.atm";
import styles from "../styles/sudoku.module.css";
import type { TSudokuCellProps } from "../types/sudoku.types";

export function SudokuCell({
  cell,
  isSelected,
  rowIndex,
  colIndex,
}: TSudokuCellProps) {
  const cellClassName = [
    styles.cell,
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
    >
      {cell.value ? cell.value : <SudokuNotes notes={cell.notes} />}
    </button>
  );
}
