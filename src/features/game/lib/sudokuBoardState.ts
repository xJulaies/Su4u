import type {
  TSudokuBoard,
  TSudokuCell,
  TSudokuCellPosition,
  TSudokuValue,
} from "../types/sudoku.types";

const SUDOKU_VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

export function isSolvedCell(cell: TSudokuCell): boolean {
  return cell.value !== null && cell.value === cell.solutionValue;
}

export function isPeerPosition(
  first: TSudokuCellPosition,
  second: TSudokuCellPosition,
): boolean {
  const isSamePosition =
    first.row === second.row && first.col === second.col;

  if (isSamePosition) return false;

  const isSameBox =
    Math.floor(first.row / 3) === Math.floor(second.row / 3) &&
    Math.floor(first.col / 3) === Math.floor(second.col / 3);

  return first.row === second.row || first.col === second.col || isSameBox;
}

export function getCompletedSudokuValues(
  board: TSudokuBoard,
): TSudokuValue[] {
  return SUDOKU_VALUES.filter((value) => {
    const correctOccurrences = board
      .flat()
      .filter((cell) => cell.value === value && isSolvedCell(cell)).length;

    return correctOccurrences === 9;
  });
}

export function hasSudokuProgress(board: TSudokuBoard): boolean {
  return board.some((row) =>
    row.some(
      (cell) =>
        !cell.isGiven && (cell.value !== null || cell.notes.length > 0),
    ),
  );
}

export function restartSudokuBoard(board: TSudokuBoard): TSudokuBoard {
  return board.map((row) =>
    row.map((cell) =>
      cell.isGiven
        ? cell
        : {
            ...cell,
            value: null,
            notes: [],
            isError: false,
          },
    ),
  );
}
