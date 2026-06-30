import { useState, useEffect } from "react";
import { generateSudokuBoard } from "../lib/sudokuGenerator";
import type {
  TSudokuValue,
  TSudokuSelectedCell,
  TDifficulty,
} from "../types/sudoku.types";

export function useSudokuGame() {
  const [board, setBoard] = useState(() => generateSudokuBoard("medium"));
  const [selectedCell, setSelectedCell] = useState<TSudokuSelectedCell | null>(
    null,
  );
  const [notesMode, setNotesMode] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (isCompleted) return;

    const timerId = window.setInterval(() => {
      setElapsedSeconds((currentSeconds) => currentSeconds + 1);
    }, 1000);

    return () => {
      window.clearInterval(timerId);
    };
  }, [isCompleted]);

  function handleGenerateBoard(difficulty: TDifficulty) {
    setBoard(generateSudokuBoard(difficulty));
    setSelectedCell(null);
    setNotesMode(false);
    setElapsedSeconds(0);
    setIsCompleted(false);
  }

  function handleCellClick(row: number, col: number) {
    const clickedCell = board[row][col];

    if (clickedCell.isGiven) {
      setSelectedCell(null);
      return;
    }

    if (selectedCell?.row === row && selectedCell?.col === col) {
      setSelectedCell(null);
      return;
    }

    setSelectedCell({ row, col });
  }

  function handleNotesToggle() {
    setNotesMode((currentMode) => !currentMode);
  }

  function handleNumber(value: TSudokuValue) {
    if (!selectedCell) return;

    const selectedBoardCell = board[selectedCell.row][selectedCell.col];
    const isCorrectValue = value === selectedBoardCell.solutionValue;

    setBoard((currentBoard) =>
      currentBoard.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const isSelectedCell =
            selectedCell.row === rowIndex && selectedCell.col === colIndex;

          if (!isSelectedCell || cell.isGiven) return cell;

          if (notesMode) {
            const hasNote = cell.notes.includes(value);

            return {
              ...cell,
              notes: hasNote
                ? cell.notes.filter((note) => note !== value)
                : [...cell.notes, value],
            };
          }

          if (cell.isError && cell.value === value) {
            return {
              ...cell,
              value: null,
              isError: false,
            };
          }

          return {
            ...cell,
            value,
            notes: [],
            isGiven: isCorrectValue,
            isError: !isCorrectValue,
          };
        }),
      ),
    );

    if (isCorrectValue) {
      setSelectedCell(null);
    }
  }
  return {
    board,
    selectedCell,
    notesMode,
    handleGenerateBoard,
    handleCellClick,
    handleNotesToggle,
    handleNumber,
    elapsedSeconds,
  };
}
