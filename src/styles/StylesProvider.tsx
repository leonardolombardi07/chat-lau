import React from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./GlobalStyles";
import { APP_THEME } from "./theme/themes";

function StylesProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={APP_THEME}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
}

export { StylesProvider };
