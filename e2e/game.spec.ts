import { expect, test } from "@playwright/test";

test("supports the current public Sudoku flow", async ({ page }) => {
  await page.goto("game");

  const cells = page.locator("button[data-row][data-col]");
  await expect(cells).toHaveCount(81);

  const editableCellIndex = await cells.evaluateAll((elements) =>
    elements.findIndex((element) => element.textContent?.trim() === ""),
  );
  expect(editableCellIndex).toBeGreaterThanOrEqual(0);

  const editableCell = cells.nth(editableCellIndex);
  await editableCell.click();
  await expect(editableCell).toHaveAttribute("aria-pressed", "true");
  await expect(
    page.locator('button[data-peer="true"]'),
  ).toHaveCount(20);
  await page.getByRole("button", { name: "Notes off" }).click();
  await page
    .locator("button:not([data-row])")
    .filter({ hasText: /^1$/ })
    .click();

  await expect(page.getByRole("button", { name: "Notes on" })).toBeVisible();
  await expect(editableCell).toContainText("1");

  await page.getByRole("button", { name: "Generate easy board" }).click();
  await expect(cells).toHaveCount(81);

  const board = page.locator("button[data-row][data-col]").first().locator("..");
  const boardBox = await board.boundingBox();
  const viewport = page.viewportSize();

  expect(boardBox).not.toBeNull();
  expect(viewport).not.toBeNull();

  if (boardBox && viewport) {
    expect(boardBox.x).toBeGreaterThanOrEqual(0);
    expect(boardBox.x + boardBox.width).toBeLessThanOrEqual(viewport.width);
  }
});
