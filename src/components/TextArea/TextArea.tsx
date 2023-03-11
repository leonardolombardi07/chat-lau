import styled from "styled-components";
import React from "react";

const StyledTextArea = styled.textarea`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  display: block;
  display: flex;
  align-items: center;
  width: 100%;
  height: 2.5rem;
  margin: 0;
  padding: 0.5rem 0.75rem;
  border: 1px solid ${(p) => p.theme.colors.border};
  border-radius: 4px;
  background-color: hsl(0 0% 100% / 10%);
  background-blend-mode: luminosity;
  box-shadow: none;
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: normal;
  line-height: 1.5;
  color: ${(p) => p.theme.colors.foreground};
  transition: box-shadow 200ms, border-color 50ms ease-out,
    background-color 50ms ease-out, color 50ms ease-out;
  min-height: 50px;
  max-width: 100%;

  ::placeholder {
    color: hsl(0 0% 100% / 65%);
  }
`;

interface TextAreaProps extends React.ComponentPropsWithoutRef<"textarea"> {}

const TextArea = React.forwardRef(function TextArea(
  props: TextAreaProps,
  ref: React.ForwardedRef<HTMLTextAreaElement>
) {
  return <StyledTextArea {...props} ref={ref} />;
});

export { TextArea };
