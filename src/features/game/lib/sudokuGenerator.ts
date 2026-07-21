import type {
  TSudokuBoard,
  TSudokuGrid,
  TSudokuValue,
  TDifficulty,
} from "../types/sudoku.types";

const GRID_SIZE = 9;
const BOX_SIZE = 3;
const SUDOKU_VALUES: TSudokuValue[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

type TRandom = () => number;

function createEmptyGrid(): TSudokuGrid {
  return Array.from({ length: GRID_SIZE }, () =>
    Array.from({ length: GRID_SIZE }, () => null),
  );
}

function cloneGrid(grid: TSudokuGrid): TSudokuGrid {
  return grid.map((row) => [...row]);
}

function shuffleValues(
  values: TSudokuValue[],
  random: TRandom,
): TSudokuValue[] {
  const shuffledValues = [...values];

  for (let index = shuffledValues.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(random() * (index + 1));
    [shuffledValues[index], shuffledValues[randomIndex]] = [
      shuffledValues[randomIndex],
      shuffledValues[index],
    ];
  }

  return shuffledValues;
}

function isValidMove(
  grid: TSudokuGrid,
  rowIndex: number,
  colIndex: number,
  value: TSudokuValue,
): boolean {
  for (let index = 0; index < GRID_SIZE; index += 1) {
    if (grid[rowIndex][index] === value) return false;
    if (grid[index][colIndex] === value) return false;
  }

  const boxStartRow = Math.floor(rowIndex / BOX_SIZE) * BOX_SIZE;
  const boxStartCol = Math.floor(colIndex / BOX_SIZE) * BOX_SIZE;

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
  for (let rowIndex = 0; rowIndex < GRID_SIZE; rowIndex += 1) {
    for (let colIndex = 0; colIndex < GRID_SIZE; colIndex += 1) {
      if (grid[rowIndex][colIndex] === null) {
        return [rowIndex, colIndex];
      }
    }
  }

  return null;
}

function fillGrid(grid: TSudokuGrid, random: TRandom): boolean {
  const emptyCell = findEmptyCell(grid);

  if (!emptyCell) return true;

  const [rowIndex, colIndex] = emptyCell;
  const values = shuffleValues(SUDOKU_VALUES, random);

  for (const value of values) {
    if (!isValidMove(grid, rowIndex, colIndex, value)) continue;

    grid[rowIndex][colIndex] = value;

    if (fillGrid(grid, random)) return true;

    grid[rowIndex][colIndex] = null;
  }

  return false;
}

function generateSolvedGrid(random: TRandom): TSudokuGrid {
  const grid = createEmptyGrid();
  fillGrid(grid, random);

  return grid;
}

function countSolutions(grid: TSudokuGrid, solutionLimit = 2): number {
  const emptyCell = findEmptyCell(grid);

  if (!emptyCell) return 1;

  const [rowIndex, colIndex] = emptyCell;
  let solutionCount = 0;

  for (const value of SUDOKU_VALUES) {
    if (!isValidMove(grid, rowIndex, colIndex, value)) continue;

    grid[rowIndex][colIndex] = value;
    solutionCount += countSolutions(grid, solutionLimit);
    grid[rowIndex][colIndex] = null;

    if (solutionCount >= solutionLimit) return solutionCount;
  }

  return solutionCount;
}

function createShuffledCellPositions(random: TRandom): [number, number][] {
  const positions: [number, number][] = [];

  for (let rowIndex = 0; rowIndex < GRID_SIZE; rowIndex += 1) {
    for (let colIndex = 0; colIndex < GRID_SIZE; colIndex += 1) {
      positions.push([rowIndex, colIndex]);
    }
  }

  for (let index = positions.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(random() * (index + 1));
    [positions[index], positions[randomIndex]] = [
      positions[randomIndex],
      positions[index],
    ];
  }

  return positions;
}

function removeCellsFromGrid(
  grid: TSudokuGrid,
  cellsToRemove: number,
  random: TRandom,
): TSudokuGrid {
  const puzzle = cloneGrid(grid);
  const positions = createShuffledCellPositions(random);
  let removedCells = 0;

  for (const [rowIndex, colIndex] of positions) {
    if (removedCells >= cellsToRemove) break;

    const currentValue = puzzle[rowIndex][colIndex];
    puzzle[rowIndex][colIndex] = null;

    const puzzleCopy = cloneGrid(puzzle);
    const hasUniqueSolution = countSolutions(puzzleCopy) === 1;

    if (hasUniqueSolution) {
      removedCells += 1;
    } else {
      puzzle[rowIndex][colIndex] = currentValue;
    }
  }

  return puzzle;
}

function convertGridToBoard(
  puzzleGrid: TSudokuGrid,
  solvedGrid: TSudokuGrid,
): TSudokuBoard {
  return puzzleGrid.map((row, rowIndex) =>
    row.map((value, colIndex) => ({
      value,
      solutionValue: solvedGrid[rowIndex][colIndex],
      notes: [],
      isGiven: value !== null,
      isError: false,
    })),
  );
}

export function generateSudokuBoard(
  difficulty: TDifficulty,
  random: TRandom = Math.random,
): TSudokuBoard {
  const solvedGrid = generateSolvedGrid(random);
  let cellsToRemove = 45;

  switch (difficulty) {
    case "easy":
      cellsToRemove = 35;
      break;
    case "medium":
      cellsToRemove = 45;
      break;
    case "hard":
      cellsToRemove = 55;
      break;
  }
  const puzzleGrid = removeCellsFromGrid(solvedGrid, cellsToRemove, random);

  return convertGridToBoard(puzzleGrid, solvedGrid);
}
