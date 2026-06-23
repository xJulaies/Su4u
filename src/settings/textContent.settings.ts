export const textContentSettings = {
  history: {
    sections: [
      {
        content:
          "Sudoku traces its origins back to mathematical number puzzles developed in the 18th century. These early concepts inspired later puzzle creators to experiment with new ways of combining logic and numbers.",
        imageUrl: "/images/history/text1.png",
      },
      {
        content:
          "The modern version of Sudoku was created in 1979 by American puzzle designer Howard Garns. Originally published under the name 'Number Place', the puzzle challenged players to complete a grid using logic rather than mathematical calculations.",
        imageUrl: "/images/history/text2.png",
        reverse: true,
      },
      {
        content:
          "Sudoku became a worldwide phenomenon in the 1980s after being introduced to Japan, where it received the name 'Sudoku', meaning 'single number'. Today, it is enjoyed by millions of players around the globe and remains one of the most popular logic puzzles ever created.",
        imageUrl: "/images/history/text3.png",
      },
    ],
  },
  rules: {
    text: `Sudoku is played on a 9x9 grid divided into nine 3x3 sections. The goal is to fill every empty cell with a number from 1 to 9.
To solve the puzzle:

- Each row must contain every number from 1 to 9 exactly once.
- Each column must contain every number from 1 to 9 exactly once.
- Each 3x3 section must contain every number from 1 to 9 exactly once.

No guessing is required - every Sudoku puzzle can be solved using logic and careful observation.`,
  },
  hero: {
    text: "Explore the world of the most famous logic puzzle: Sudoku!",
  },
  about: {
    text: "Su4u is a small Sudoku learning project built with React and TypeScript. The goal of this project is to practice component-based frontend development, routing, theming, reusable layouts, and clean project structure.\n\nThe app introduces Sudoku, explains the basic rules, and gives a short overview of the game's history. It is also a practice project for working with Vite, Tailwind CSS, TanStack Router, custom hooks, and feature-based architecture.\n\nThis project is part of my personal learning journey as a web developer.",
  },
  impressum: {
    sections: [
      {
        content:
          "Su4u is a non-commercial learning project created to practice modern frontend development with React and TypeScript. The project focuses on building a small Sudoku-themed web application with reusable components, client-side routing, custom hooks, theme handling, and a feature-based project structure. The purpose of this website is educational. It is not intended as a commercial product, official Sudoku platform, or professional puzzle service. All content is used to demonstrate layout, component architecture, styling, and basic application structure in a practical learning context.",
      },
      {
        content: "Responsible for content:\n\nxJulaies",
      },
      {
        content: "Contact:\n\nxjulaiesx@gmail.com",
      },
      {
        content: "Project:\n\nSu4u - Sudoku for you",
      },
      {
        content:
          "Disclaimer:\n\nThis project is created for educational and demonstration purposes only. It is not affiliated with any official Sudoku brand, publisher, or organization.",
      },
      {
        content:
          "Image Credits:\n\nImages used in this project are local project assets created by AI for demonstration purposes.",
      },
    ],
  },
};
