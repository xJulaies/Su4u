import type {
  TSudokuBoard,
  TSudokuCellPosition,
  TSudokuGrid,
} from "../types/sudoku.types";

export const solvedGrid: TSudokuGrid = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9],
];

export const emptyBoard: TSudokuBoard = Array.from({ length: 9 }, () =>
  Array.from({ length: 9 }, () => ({
    value: null,
    solutionValue: null,
    notes: [],
    isGiven: false,
    isError: false,
  })),
);

export function createTestBoard(
  editableCells: TSudokuCellPosition[] = [],
): TSudokuBoard {
  return solvedGrid.map((row, rowIndex) =>
    row.map((solutionValue, colIndex) => {
      const isEditable = editableCells.some(
        ({ row: editableRow, col: editableCol }) =>
          editableRow === rowIndex && editableCol === colIndex,
      );

      return {
        value: isEditable ? null : solutionValue,
        solutionValue,
        notes: [],
        isGiven: !isEditable,
        isError: false,
      };
    }),
  );
}
