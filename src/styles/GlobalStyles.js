import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    --color-bg: #fafafa;
    --color-text: #2c2c2c;
    --color-accent: #b44c4c;
    --color-secondary: #4c4cb4;
    --font-sans: 'Noto Sans JP', sans-serif;
    --font-serif: 'Noto Serif JP', serif;
  }

  .dark-theme {
    --color-bg: #1a1a1a;
    --color-text: #fafafa;
    --color-accent: #ff6b6b;
    --color-secondary: #6b6bff;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: var(--color-bg);
    color: var(--color-text);
    font-family: var(--font-sans);
    line-height: 1.6;
    overflow-x: hidden;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-serif);
    font-weight: 700;
    line-height: 1.3;
  }

  input, textarea, button {
    transition: all 0.3s ease;
  }

  @media (max-width: 768px) {
    html {
      font-size: 14px;
    }
  }
`;
