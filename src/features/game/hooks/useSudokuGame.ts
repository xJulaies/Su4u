import { useEffect, useReducer } from "react";
import { generateSudokuBoard } from "../lib/sudokuGenerator";
import type {
  TSudokuValue,
  TSudokuSelectedCell,
  TDifficulty,
  TSudokuBoard,
} from "../types/sudoku.types";

type TSudokuGameState = {
  board: TSudokuBoard;
  selectedCell: TSudokuSelectedCell;
  notesMode: boolean;
  elapsedSeconds: number;
  isCompleted: boolean;
  currentDifficulty: TDifficulty;
};

type TSudokuGameAction =
  | { type: "generateBoard"; difficulty: TDifficulty }
  | { type: "toggleNotesMode" }
  | { type: "tickTimer" }
  | { type: "cellClicked"; row: number; col: number }
  | { type: "numberEntered"; value: TSudokuValue };

const initialState: TSudokuGameState = {
  board: generateSudokuBoard("medium"),
  selectedCell: null,
  notesMode: false,
  elapsedSeconds: 0,
  isCompleted: false,
  currentDifficulty: "medium",
};

function isSudokuSolved(boardToCheck: TSudokuBoard) {
  return boardToCheck.every((row) =>
    row.every(
      (cell) => cell.value !== null && cell.value === cell.solutionValue,
    ),
  );
}

function sudokuGameReducer(
  state: TSudokuGameState,
  action: TSudokuGameAction,
): TSudokuGameState {
  switch (action.type) {
    case "generateBoard":
      return {
        board: generateSudokuBoard(action.difficulty),
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
      const clickedCell = state.board[action.row][action.col];

      if (clickedCell.isGiven) {
        return {
          ...state,
          selectedCell: null,
        };
      }

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
      const isCorrectValue = action.value === selectedBoardCell.solutionValue;

      const nextBoard = state.board.map((boardRow, rowIndex) =>
        boardRow.map((cell, colIndex) => {
          const isSelectedCell = row === rowIndex && col === colIndex;

          if (!isSelectedCell || cell.isGiven) return cell;

          if (state.notesMode) {
            const hasNote = cell.notes.includes(action.value);

            return {
              ...cell,
              notes: hasNote
                ? cell.notes.filter((note) => note !== action.value)
                : [...cell.notes, action.value],
            };
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
            isGiven: isCorrectValue,
            isError: !isCorrectValue,
          };
        }),
      );

      const isCompleted = isCorrectValue && isSudokuSolved(nextBoard);
      return {
        ...state,
        board: nextBoard,
        isCompleted,
        selectedCell: isCorrectValue ? null : state.selectedCell,
      };
    }

    default:
      return state;
  }
}

export function useSudokuGame() {
  const [state, dispatch] = useReducer(sudokuGameReducer, initialState);

  useEffect(() => {
    if (state.isCompleted) return;

    const timerId = window.setInterval(() => {
      dispatch({ type: "tickTimer" });
    }, 1000);

    return () => {
      window.clearInterval(timerId);
    };
  }, [state.isCompleted]);

  function handleGenerateBoard(difficulty: TDifficulty) {
    dispatch({ type: "generateBoard", difficulty });
  }

  function handleRestartBoard() {
    handleGenerateBoard(state.currentDifficulty);
  }

  function handleCellClick(row: number, col: number) {
    dispatch({ type: "cellClicked", row, col });
  }

  function handleNotesToggle() {
    dispatch({ type: "toggleNotesMode" });
  }

  function handleNumber(value: TSudokuValue) {
    dispatch({ type: "numberEntered", value });
  }
  return {
    board: state.board,
    selectedCell: state.selectedCell,
    notesMode: state.notesMode,
    elapsedSeconds: state.elapsedSeconds,
    isCompleted: state.isCompleted,
    currentDifficulty: state.currentDifficulty,
    handleGenerateBoard,
    handleCellClick,
    handleNotesToggle,
    handleNumber,
    handleRestartBoard,
  };
}
