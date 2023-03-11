import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: "baloo";
    src: url("../../public/fonts/baloo.woff") format("woff");
    font-weight: normal;
    font-style: normal;
  }

 :root {
    --hs-links: 48 100%;
    --gradient-background: radial-gradient(
      circle,
      rgba(152, 11, 238, 1) 0%,
      rgba(118, 15, 181, 1) 35%,
      rgba(58, 13, 85, 1) 100%
    );
    --font-body: -apple-system, "Segoe UI", Helvetica Neue, Helvetica, Roboto,
      Arial, sans-serif, system-ui, "Apple Color Emoji", "Segoe UI Emoji";
    --font-display: baloo, var(--font-body);
}

html {
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}

:-moz-focusring {
  outline: auto;
}

:focus {
  outline: ${(p) => p.theme.colors.link} solid 2px;
  outline-offset: 2px;
}

html,
body {
  padding: 0;
  margin: 0;
  color: ${(p) => p.theme.colors.foreground};
  background-color: ${(p) => p.theme.colors.background};
}

body {
  font-family: var(--font-body);
  line-height: 1.5;
  background-repeat: no-repeat;
  min-height: 100vh;
  min-height: calc(100vh - env(safe-area-inset-bottom));
}

a {
  color: ${(p) => p.theme.colors.link};
  text-decoration: none;
}

a:hover {
  color: ${(p) => p.theme.colors.link};
  text-decoration: underline;
}

hr {
  display: block;
  height: 1px;
  border: 0;
  background-color: ${(p) => p.theme.colors.border};
  margin-top: 2rem;
  margin-bottom: 2rem;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: var(--font-display);
  margin: 0;
}

h1 {
  font-size: 2.25rem;
  line-height: 2.5rem;
}

h2 {
  font-size: 1.5rem;
  line-height: 2rem;
}

h3 {
  font-size: 1.25rem;
  line-height: 1.75rem;
}

h4 {
  font-size: 1.125rem;
  line-height: 1.75rem;
}

h5,
h6 {
  font-size: 0.875rem;
  line-height: 1.25rem;
}
`;

export { GlobalStyles };
