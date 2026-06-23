import styles from "../styles/sudoku.module.css";
import type { TSudokuNotesProps } from "../types/sudoku.types";

export function SudokuNotes({ notes }: TSudokuNotesProps) {
  const notesValues = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
  return (
    <div className={styles.notes}>
      {notesValues.map((note) => (
        <span key={note} className={styles.note}>
          {notes.includes(note) ? note : ""}
        </span>
      ))}
    </div>
  );
}
