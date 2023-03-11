import { ButtonHTMLAttributes } from "react";
import styled, { css, DefaultTheme } from "styled-components";
import { ButtonVariety } from "./constants";
import React from "react";

interface WithTheme {
  theme: DefaultTheme;
}

const base = css`
  --shadow-color: hsl(var(--hs-links) 30%);
  --shadow-size: 3px;
  -webkit-appearance: none;
  -moz-appearance: none;
  cursor: pointer;
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-weight: bold;
  line-height: 1;
  font-size: 1.125rem;
  margin: 0;
  padding: 0.625em 1em;
  border: 0;
  border-radius: 4px;
  outline-offset: 2px;
  transform: translateY(0);
  transition: background-color 50ms ease-out, box-shadow 50ms ease-out,
    transform 100ms cubic-bezier(0.3, 0.6, 0.8, 1.25);

  &:hover {
    --raise: 1px;
    text-decoration: none;
    transform: translateY(calc(var(--raise) * -1));
  }

  &:active {
    --press: 1px;
    transform: translateY(var(--press));
  }

  &:disabled,
  &[aria-disabled="true"] {
    transform: translateY(0);
    pointer-events: none;
    opacity: 0.7;
  }
`;

const primaryColors = ({ theme }: WithTheme) => css`
  background-color: ${theme.colors.link};
  color: ${theme.colors.background};

  &:hover {
    box-shadow: 0 calc(var(--shadow-size) + var(--raise)) 0 0
      var(--shadow-color);
  }

  &:active {
    box-shadow: 0 calc(var(--shadow-size) - var(--press)) 0 0
      var(--shadow-color);
  }
`;

const secondaryColors = ({ theme }: WithTheme) => css`
  background-color: ghostwhite;
  color: black;
`;

const buttonColors = {
  primary: primaryColors,
  secondary: secondaryColors,
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variety: ButtonVariety;
}

const StyledButton = styled.button<ButtonProps>`
  ${base}
  ${({ variety }) => variety && buttonColors[variety]};
`;

const Button = React.forwardRef(function Button(
  props: ButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const elementProps = { ref, ...props };
  return <StyledButton {...elementProps}>{props.children}</StyledButton>;
});

export { Button };
