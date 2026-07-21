import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SudokuTimer } from "../atoms/sudokuTimer.atm";
import { SudokuNotesToggle } from "../atoms/sudokuNotesToggle.atm";
import { SudokuBoard } from "../organisms/sudokuBoard.org";
import { SudokuNumberPad } from "./sudokuNumberPad.mol";
import { SudokuWinDialog } from "./sudokuWinDialog.mol";
import { createTestBoard } from "../test/testBoards";

describe("Sudoku components", () => {
  it("formats elapsed time", () => {
    render(<SudokuTimer elapsedSeconds={125} />);

    expect(screen.getByText("Time: 02:05")).toBeInTheDocument();
  });

  it("toggles notes through its visible control", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    const { rerender } = render(
      <SudokuNotesToggle isActive={false} onClick={onClick} />,
    );
    await user.click(screen.getByRole("button", { name: "Notes off" }));
    expect(onClick).toHaveBeenCalledOnce();

    rerender(<SudokuNotesToggle isActive onClick={onClick} />);
    expect(
      screen.getByRole("button", { name: "Notes on" }),
    ).toBeInTheDocument();
  });

  it("forwards number-pad input", async () => {
    const user = userEvent.setup();
    const onNumberClick = vi.fn();

    render(
      <SudokuNumberPad
        completedValues={[]}
        onNumberClick={onNumberClick}
      />,
    );
    await user.click(screen.getByRole("button", { name: "7" }));

    expect(onNumberClick).toHaveBeenCalledWith(7);
  });

  it("disables completed number-pad values", async () => {
    const user = userEvent.setup();
    const onNumberClick = vi.fn();

    render(
      <SudokuNumberPad
        completedValues={[7]}
        onNumberClick={onNumberClick}
      />,
    );
    const completedNumber = screen.getByRole("button", {
      name: "7 complete",
    });

    expect(completedNumber).toBeDisabled();
    await user.click(completedNumber);
    expect(onNumberClick).not.toHaveBeenCalled();
  });

  it("forwards the selected board coordinates", async () => {
    const user = userEvent.setup();
    const onCellClick = vi.fn();

    render(
      <SudokuBoard
        board={createTestBoard([{ row: 0, col: 0 }])}
        selectedCell={null}
        onCellClick={onCellClick}
      />,
    );
    const cell = document.querySelector<HTMLButtonElement>(
      'button[data-row="0"][data-col="0"]',
    );

    expect(cell).not.toBeNull();
    if (!cell) throw new Error("Expected the editable Sudoku cell to exist.");

    await user.click(cell);

    expect(onCellClick).toHaveBeenCalledWith(0, 0);
  });

  it("marks selected, peer, and matching-value cells", () => {
    render(
      <SudokuBoard
        board={createTestBoard([{ row: 0, col: 0 }])}
        selectedCell={{ row: 0, col: 1 }}
        onCellClick={vi.fn()}
      />,
    );

    expect(
      document.querySelector('button[data-row="0"][data-col="1"]'),
    ).toHaveAttribute("aria-pressed", "true");
    expect(
      document.querySelector('button[data-row="0"][data-col="0"]'),
    ).toHaveAttribute("data-peer", "true");
    expect(
      document.querySelector('button[data-row="1"][data-col="6"]'),
    ).toHaveAttribute("data-matching-value", "true");
    expect(
      document.querySelector('button[data-row="4"][data-col="4"]'),
    ).not.toHaveAttribute("data-peer");
  });

  it("shows completion details and starts another game", async () => {
    const user = userEvent.setup();
    const onPlayAgain = vi.fn();
    const { rerender } = render(
      <SudokuWinDialog
        isOpen={false}
        elapsedSeconds={65}
        onPlayAgain={onPlayAgain}
      />,
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    rerender(
      <SudokuWinDialog
        isOpen
        elapsedSeconds={65}
        onPlayAgain={onPlayAgain}
      />,
    );

    expect(screen.getByRole("dialog")).toHaveTextContent("Time: 01:05");
    await user.click(screen.getByRole("button", { name: "Play again" }));
    expect(onPlayAgain).toHaveBeenCalledOnce();
  });
});
