import { useState, useEffect } from "react";
import type { TTheme } from "../types/hooks.types";

const THEME_STORAGE_KEY = "theme";

function isTheme(value: string | null): value is TTheme {
  return value === "light" || value === "dark";
}

export function useTheme() {
  const [theme, setTheme] = useState<TTheme>(() => {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);

    return isTheme(storedTheme) ? storedTheme : "dark";
  });

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  return { theme, toggleTheme };
}
