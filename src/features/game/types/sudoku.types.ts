export type TSudokuValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type TSudokuCell = {
  value: TSudokuValue | null;
  solutionValue: TSudokuValue | null;
  notes: TSudokuValue[];
  isGiven: boolean;
  isError: boolean;
};

export type TSudokuBoard = TSudokuCell[][];

export type TSudokuGrid = (TSudokuValue | null)[][];

export type TSudokuCellPosition = {
  row: number;
  col: number;
};

export type TSudokuSelectedCell = TSudokuCellPosition | null;

export type TSudokuNotesProps = {
  notes: TSudokuValue[];
};

export type TSudokuCellProps = {
  cell: TSudokuCell;
  isSelected: boolean;
  rowIndex: number;
  colIndex: number;
};

export type TSudokuBoardProps = {
  board: TSudokuBoard;
  selectedCell: TSudokuSelectedCell;
  onCellClick: (row: number, col: number) => void;
};

export type TSudokuGenerateBtnProps = {
  text: string;
  onClick: () => void;
};

export type TSudokuNotesToggleProps = {
  isActive: boolean;
  onClick: () => void;
};

export type TSudokuNumberBtnProps = {
  value: TSudokuValue;
  onClick: (value: TSudokuValue) => void;
};

export type TSudokuNumberPadProps = {
  onNumberClick: (value: TSudokuValue) => void;
};
