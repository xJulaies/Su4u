import { generateSudokuBoard } from "./sudokuGenerator";
import type {
  TDifficulty,
  TSudokuBoard,
  TSudokuSelectedCell,
  TSudokuValue,
} from "../types/sudoku.types";
import {
  getCompletedSudokuValues,
  isPeerPosition,
  isSolvedCell,
} from "./sudokuBoardState";

export type TSudokuGameState = {
  board: TSudokuBoard;
  selectedCell: TSudokuSelectedCell;
  notesMode: boolean;
  elapsedSeconds: number;
  isCompleted: boolean;
  currentDifficulty: TDifficulty;
};

export type TSudokuGameAction =
  | { type: "boardGenerated"; difficulty: TDifficulty; board: TSudokuBoard }
  | { type: "toggleNotesMode" }
  | { type: "tickTimer" }
  | { type: "cellClicked"; row: number; col: number }
  | { type: "numberEntered"; value: TSudokuValue };

export function createInitialSudokuGameState(
  difficulty: TDifficulty,
): TSudokuGameState {
  return {
    board: generateSudokuBoard(difficulty),
    selectedCell: null,
    notesMode: false,
    elapsedSeconds: 0,
    isCompleted: false,
    currentDifficulty: difficulty,
  };
}

export function isSudokuSolved(board: TSudokuBoard): boolean {
  return board.every((row) =>
    row.every(
      (cell) => cell.value !== null && cell.value === cell.solutionValue,
    ),
  );
}

export function sudokuGameReducer(
  state: TSudokuGameState,
  action: TSudokuGameAction,
): TSudokuGameState {
  switch (action.type) {
    case "boardGenerated":
      return {
        board: action.board,
        selectedCell: null,
        notesMode: false,
        elapsedSeconds: 0,
        isCompleted: false,
        currentDifficulty: action.difficulty,
      };

    case "toggleNotesMode":
      return {
        ...state,
        notesMode: !state.notesMode,
      };

    case "tickTimer":
      return {
        ...state,
        elapsedSeconds: state.elapsedSeconds + 1,
      };

    case "cellClicked": {
      if (
        state.selectedCell?.row === action.row &&
        state.selectedCell?.col === action.col
      ) {
        return {
          ...state,
          selectedCell: null,
        };
      }

      return {
        ...state,
        selectedCell: {
          row: action.row,
          col: action.col,
        },
      };
    }

    case "numberEntered": {
      if (!state.selectedCell) return state;

      const { row, col } = state.selectedCell;
      const selectedBoardCell = state.board[row][col];
      const isSelectedCellImmutable =
        selectedBoardCell.isGiven || isSolvedCell(selectedBoardCell);

      if (
        isSelectedCellImmutable ||
        getCompletedSudokuValues(state.board).includes(action.value)
      ) {
        return state;
      }

      const isCorrectValue = action.value === selectedBoardCell.solutionValue;

      const nextBoard = state.board.map((boardRow, rowIndex) =>
        boardRow.map((cell, colIndex) => {
          const isSelectedCell = row === rowIndex && col === colIndex;

          if (state.notesMode) {
            if (!isSelectedCell || cell.value !== null) return cell;

            const hasNote = cell.notes.includes(action.value);

            return {
              ...cell,
              notes: hasNote
                ? cell.notes.filter((note) => note !== action.value)
                : [...cell.notes, action.value],
            };
          }

          if (!isSelectedCell) {
            if (
              isCorrectValue &&
              isPeerPosition(
                { row, col },
                { row: rowIndex, col: colIndex },
              ) &&
              cell.notes.includes(action.value)
            ) {
              return {
                ...cell,
                notes: cell.notes.filter((note) => note !== action.value),
              };
            }

            return cell;
          }

          if (cell.isError && cell.value === action.value) {
            return {
              ...cell,
              value: null,
              isError: false,
            };
          }

          return {
            ...cell,
            value: action.value,
            notes: [],
            isError: !isCorrectValue,
          };
        }),
      );

      const isCompleted = isCorrectValue && isSudokuSolved(nextBoard);

      return {
        ...state,
        board: nextBoard,
        isCompleted,
        selectedCell: state.selectedCell,
      };
    }

    default:
      return state;
  }
}
