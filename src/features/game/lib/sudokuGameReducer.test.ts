import { describe, expect, it } from "vitest";
import {
  isSudokuSolved,
  sudokuGameReducer,
  type TSudokuGameState,
} from "./sudokuGameReducer";
import { createTestBoard } from "../test/testBoards";
import { getCompletedSudokuValues } from "./sudokuBoardState";

function createState(): TSudokuGameState {
  return {
    board: createTestBoard([{ row: 0, col: 0 }]),
    selectedCell: null,
    notesMode: false,
    elapsedSeconds: 0,
    isCompleted: false,
    currentDifficulty: "medium",
  };
}

describe("sudokuGameReducer", () => {
  it("replaces and resets the game when a board is generated", () => {
    const state = {
      ...createState(),
      selectedCell: { row: 0, col: 0 },
      notesMode: true,
      elapsedSeconds: 30,
    };
    const board = createTestBoard([{ row: 1, col: 1 }]);

    const nextState = sudokuGameReducer(state, {
      type: "boardGenerated",
      difficulty: "hard",
      board,
    });

    expect(nextState).toEqual({
      board,
      selectedCell: null,
      notesMode: false,
      elapsedSeconds: 0,
      isCompleted: false,
      currentDifficulty: "hard",
    });
  });

  it("toggles notes mode and advances the timer", () => {
    const notesState = sudokuGameReducer(createState(), {
      type: "toggleNotesMode",
    });
    const timerState = sudokuGameReducer(notesState, { type: "tickTimer" });

    expect(notesState.notesMode).toBe(true);
    expect(timerState.elapsedSeconds).toBe(1);
  });

  it("selects every cell and deselects a repeated selection", () => {
    const selectedState = sudokuGameReducer(createState(), {
      type: "cellClicked",
      row: 0,
      col: 0,
    });
    const repeatedState = sudokuGameReducer(selectedState, {
      type: "cellClicked",
      row: 0,
      col: 0,
    });
    const givenState = sudokuGameReducer(repeatedState, {
      type: "cellClicked",
      row: 0,
      col: 1,
    });

    expect(selectedState.selectedCell).toEqual({ row: 0, col: 0 });
    expect(repeatedState.selectedCell).toBeNull();
    expect(givenState.selectedCell).toEqual({ row: 0, col: 1 });
  });

  it("adds and removes notes from the selected editable cell", () => {
    const selectedState = {
      ...createState(),
      selectedCell: { row: 0, col: 0 },
      notesMode: true,
    };
    const withNote = sudokuGameReducer(selectedState, {
      type: "numberEntered",
      value: 5,
    });
    const withoutNote = sudokuGameReducer(withNote, {
      type: "numberEntered",
      value: 5,
    });

    expect(withNote.board[0][0].notes).toEqual([5]);
    expect(withoutNote.board[0][0].notes).toEqual([]);
  });

  it("marks incorrect values and clears a repeated incorrect value", () => {
    const board = createTestBoard([
      { row: 0, col: 0 },
      { row: 0, col: 1 },
    ]);
    const selectedState = {
      ...createState(),
      board,
      selectedCell: { row: 0, col: 0 },
    };
    const errorState = sudokuGameReducer(selectedState, {
      type: "numberEntered",
      value: 3,
    });
    const clearedState = sudokuGameReducer(errorState, {
      type: "numberEntered",
      value: 3,
    });

    expect(errorState.board[0][0]).toMatchObject({
      value: 3,
      isError: true,
    });
    expect(clearedState.board[0][0]).toMatchObject({
      value: null,
      isError: false,
    });
  });

  it("removes the entered value from peer notes after a correct entry", () => {
    const board = createTestBoard([
      { row: 0, col: 0 },
      { row: 0, col: 1 },
      { row: 1, col: 0 },
      { row: 1, col: 1 },
      { row: 3, col: 3 },
    ]);

    for (const [row, col] of [
      [0, 1],
      [1, 0],
      [1, 1],
      [3, 3],
    ] as const) {
      board[row][col] = { ...board[row][col], notes: [3, 5] };
    }

    const nextState = sudokuGameReducer(
      { ...createState(), board, selectedCell: { row: 0, col: 0 } },
      { type: "numberEntered", value: 5 },
    );

    expect(nextState.board[0][1].notes).toEqual([3]);
    expect(nextState.board[1][0].notes).toEqual([3]);
    expect(nextState.board[1][1].notes).toEqual([3]);
    expect(nextState.board[3][3].notes).toEqual([3, 5]);
  });

  it("does not remove peer notes after an incorrect entry", () => {
    const board = createTestBoard([
      { row: 0, col: 0 },
      { row: 0, col: 1 },
    ]);
    board[0][1] = { ...board[0][1], notes: [3] };

    const nextState = sudokuGameReducer(
      { ...createState(), board, selectedCell: { row: 0, col: 0 } },
      { type: "numberEntered", value: 3 },
    );

    expect(nextState.board[0][1].notes).toEqual([3]);
  });

  it("ignores number entry without a selected cell", () => {
    const state = createState();

    expect(
      sudokuGameReducer(state, { type: "numberEntered", value: 5 }),
    ).toBe(state);
  });

  it("completes the board after the final correct value", () => {
    const state = {
      ...createState(),
      selectedCell: { row: 0, col: 0 },
    };

    const completedState = sudokuGameReducer(state, {
      type: "numberEntered",
      value: 5,
    });

    expect(completedState.board[0][0].value).toBe(5);
    expect(completedState.board[0][0].isGiven).toBe(false);
    expect(completedState.selectedCell).toEqual({ row: 0, col: 0 });
    expect(completedState.isCompleted).toBe(true);
    expect(isSudokuSolved(completedState.board)).toBe(true);
  });

  it("keeps solved player cells immutable", () => {
    const selectedState = {
      ...createState(),
      selectedCell: { row: 0, col: 0 },
    };
    const solvedState = sudokuGameReducer(selectedState, {
      type: "numberEntered",
      value: 5,
    });

    expect(
      sudokuGameReducer(solvedState, { type: "numberEntered", value: 3 }),
    ).toBe(solvedState);
  });

  it("recognizes complete values and ignores their input", () => {
    const state = createState();

    expect(getCompletedSudokuValues(state.board)).not.toContain(5);
    expect(getCompletedSudokuValues(state.board)).toContain(3);
    expect(
      sudokuGameReducer(state, { type: "numberEntered", value: 3 }),
    ).toBe(state);
  });

  it("recognizes an incomplete board", () => {
    expect(isSudokuSolved(createState().board)).toBe(false);
  });
});
