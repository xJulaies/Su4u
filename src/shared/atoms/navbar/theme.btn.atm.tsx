import type { TThemeBtnProps } from "./theme.btn.types";

export function ChangeThemeBtn({ onClick, theme }: TThemeBtnProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface-muted text-primary shadow-sm transition hover:bg-primary hover:text-primary-content"
      aria-label="change Theme"
    >
      {theme === "dark" ? "☀" : "☾"}
    </button>
  );
}
