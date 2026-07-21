import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createTestBoard } from "../test/testBoards";

const { generateSudokuBoardMock } = vi.hoisted(() => ({
  generateSudokuBoardMock: vi.fn(),
}));

vi.mock("../lib/sudokuGenerator", () => ({
  generateSudokuBoard: generateSudokuBoardMock,
}));

import { useSudokuGame } from "./useSudokuGame";

describe("useSudokuGame", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    generateSudokuBoardMock.mockImplementation(() =>
      createTestBoard([{ row: 0, col: 0 }]),
    );
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("coordinates timer and game interactions", () => {
    const { result } = renderHook(() => useSudokuGame());

    expect(generateSudokuBoardMock).toHaveBeenCalledWith("medium");

    act(() => {
      vi.advanceTimersByTime(2_000);
    });
    expect(result.current.elapsedSeconds).toBe(2);

    act(() => {
      result.current.handleCellClick(0, 0);
      result.current.handleNotesToggle();
    });
    act(() => {
      result.current.handleNumber(5);
    });

    expect(result.current.selectedCell).toEqual({ row: 0, col: 0 });
    expect(result.current.notesMode).toBe(true);
    expect(result.current.board[0][0].notes).toEqual([5]);
    expect(result.current.completedValues).not.toContain(5);
    expect(result.current.hasProgress).toBe(true);

    act(() => {
      result.current.handleRestartBoard();
    });

    expect(result.current.board[0][0].notes).toEqual([]);
    expect(result.current.hasProgress).toBe(false);
    expect(result.current.elapsedSeconds).toBe(0);

    act(() => {
      result.current.handleGenerateBoard("hard");
    });

    expect(generateSudokuBoardMock).toHaveBeenLastCalledWith("hard");
    expect(result.current.currentDifficulty).toBe("hard");
    expect(result.current.elapsedSeconds).toBe(0);
  });

  it("stops the timer after completion", () => {
    const { result } = renderHook(() => useSudokuGame());

    act(() => {
      result.current.handleCellClick(0, 0);
      result.current.handleNumber(5);
    });
    expect(result.current.isCompleted).toBe(true);
    expect(result.current.completedValues).toContain(5);

    act(() => {
      vi.advanceTimersByTime(2_000);
    });
    expect(result.current.elapsedSeconds).toBe(0);
  });
});
