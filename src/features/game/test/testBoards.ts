import type { TSudokuBoard } from "../types/sudoku.types";

export const emptyBoard: TSudokuBoard = Array.from({ length: 9 }, () =>
  Array.from({ length: 9 }, () => ({
    value: null,
    solutionValue: null,
    notes: [],
    isGiven: false,
    isError: false,
  })),
);
