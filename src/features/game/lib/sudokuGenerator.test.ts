import { describe, expect, it } from "vitest";
import { generateSudokuBoard } from "./sudokuGenerator";
import type {
  TDifficulty,
  TSudokuBoard,
  TSudokuGrid,
  TSudokuValue,
} from "../types/sudoku.types";
import {
  countGridSolutions,
  createSeededRandom,
} from "../test/sudokuTestUtils";

const DIFFICULTIES: TDifficulty[] = ["easy", "medium", "hard"];
const EXPECTED_VALUES: TSudokuValue[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function getSolutionGrid(board: TSudokuBoard): TSudokuGrid {
  return board.map((row) => row.map((cell) => cell.solutionValue));
}

function getPuzzleGrid(board: TSudokuBoard): TSudokuGrid {
  return board.map((row) => row.map((cell) => cell.value));
}

function expectValidGroup(values: (TSudokuValue | null)[]): void {
  expect([...values].sort()).toEqual(EXPECTED_VALUES);
}

describe("generateSudokuBoard", () => {
  it.each(DIFFICULTIES)(
    "creates a valid, uniquely solvable %s board",
    (difficulty) => {
      const board = generateSudokuBoard(
        difficulty,
        createSeededRandom(2_026),
      );
      const solution = getSolutionGrid(board);
      const puzzle = getPuzzleGrid(board);

      expect(board).toHaveLength(9);
      board.forEach((row) => expect(row).toHaveLength(9));

      solution.forEach(expectValidGroup);

      for (let col = 0; col < 9; col += 1) {
        expectValidGroup(solution.map((row) => row[col]));
      }

      for (let boxRow = 0; boxRow < 3; boxRow += 1) {
        for (let boxCol = 0; boxCol < 3; boxCol += 1) {
          const values = solution
            .slice(boxRow * 3, boxRow * 3 + 3)
            .flatMap((row) => row.slice(boxCol * 3, boxCol * 3 + 3));
          expectValidGroup(values);
        }
      }

      board.flat().forEach((cell) => {
        expect(cell.notes).toEqual([]);
        expect(cell.isError).toBe(false);
        expect(cell.isGiven).toBe(cell.value !== null);

        if (cell.value !== null) {
          expect(cell.value).toBe(cell.solutionValue);
        }
      });

      expect(countGridSolutions(puzzle.map((row) => [...row]))).toBe(1);
    },
  );

  it("creates reproducible boards with the same random seed", () => {
    const firstBoard = generateSudokuBoard("medium", createSeededRandom(42));
    const secondBoard = generateSudokuBoard("medium", createSeededRandom(42));

    expect(secondBoard).toEqual(firstBoard);
  });

  it("removes more cells as the selected difficulty increases", () => {
    const emptyCellCounts = DIFFICULTIES.map((difficulty) =>
      generateSudokuBoard(difficulty, createSeededRandom(7))
        .flat()
        .filter((cell) => cell.value === null).length,
    );

    expect(emptyCellCounts[0]).toBeLessThan(emptyCellCounts[1]);
    expect(emptyCellCounts[1]).toBeLessThan(emptyCellCounts[2]);
  });
});
