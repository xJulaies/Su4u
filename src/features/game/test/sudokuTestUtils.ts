import type { TSudokuGrid, TSudokuValue } from "../types/sudoku.types";

const GRID_SIZE = 9;
const BOX_SIZE = 3;
const SUDOKU_VALUES: TSudokuValue[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export function createSeededRandom(seed: number): () => number {
  let state = seed >>> 0;

  return () => {
    state = (state * 1_664_525 + 1_013_904_223) >>> 0;
    return state / 4_294_967_296;
  };
}

function isValidMove(
  grid: TSudokuGrid,
  row: number,
  col: number,
  value: TSudokuValue,
): boolean {
  for (let index = 0; index < GRID_SIZE; index += 1) {
    if (grid[row][index] === value || grid[index][col] === value) {
      return false;
    }
  }

  const boxStartRow = Math.floor(row / BOX_SIZE) * BOX_SIZE;
  const boxStartCol = Math.floor(col / BOX_SIZE) * BOX_SIZE;

  for (let rowOffset = 0; rowOffset < BOX_SIZE; rowOffset += 1) {
    for (let colOffset = 0; colOffset < BOX_SIZE; colOffset += 1) {
      if (grid[boxStartRow + rowOffset][boxStartCol + colOffset] === value) {
        return false;
      }
    }
  }

  return true;
}

function findEmptyCell(grid: TSudokuGrid): [number, number] | null {
  for (let row = 0; row < GRID_SIZE; row += 1) {
    for (let col = 0; col < GRID_SIZE; col += 1) {
      if (grid[row][col] === null) return [row, col];
    }
  }

  return null;
}

export function countGridSolutions(
  grid: TSudokuGrid,
  limit = 2,
): number {
  const emptyCell = findEmptyCell(grid);

  if (!emptyCell) return 1;

  const [row, col] = emptyCell;
  let solutions = 0;

  for (const value of SUDOKU_VALUES) {
    if (!isValidMove(grid, row, col, value)) continue;

    grid[row][col] = value;
    solutions += countGridSolutions(grid, limit);
    grid[row][col] = null;

    if (solutions >= limit) return solutions;
  }

  return solutions;
}
