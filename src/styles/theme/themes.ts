import { DefaultTheme } from "styled-components";
import { breakpoint } from "./breakpoint";
import * as Colors from "./colors";

export const APP_THEME: DefaultTheme = {
  colors: {
    background: Colors.background,
    foreground: Colors.foreground,
    border: Colors.border,
    error: Colors.error,
    link: Colors.link,
  },
  breakpoint: breakpoint,
};
