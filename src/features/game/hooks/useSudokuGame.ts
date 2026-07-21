import { useEffect, useReducer } from "react";
import { generateSudokuBoard } from "../lib/sudokuGenerator";
import {
  createInitialSudokuGameState,
  sudokuGameReducer,
} from "../lib/sudokuGameReducer";
import type { TDifficulty, TSudokuValue } from "../types/sudoku.types";
import { getCompletedSudokuValues } from "../lib/sudokuBoardState";

export function useSudokuGame() {
  const [state, dispatch] = useReducer(
    sudokuGameReducer,
    "medium",
    createInitialSudokuGameState,
  );

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
    dispatch({
      type: "boardGenerated",
      difficulty,
      board: generateSudokuBoard(difficulty),
    });
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
    completedValues: getCompletedSudokuValues(state.board),
    handleGenerateBoard,
    handleCellClick,
    handleNotesToggle,
    handleNumber,
    handleRestartBoard,
  };
}
