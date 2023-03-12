import styled from "styled-components";
import React from "react";

const Container = styled.div`
  width: 100%;
  height: 2.5rem;
  background-color: hsl(0 0% 100% / 10%);
  background-blend-mode: luminosity;
  min-height: 50px;

  /* Internal Layout */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  height: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid ${(p) => p.theme.colors.border};
  border-radius: 4px;
  background-color: inherit;
  font-family: var(--font-body);
  font-size: 1rem;
  color: ${(p) => p.theme.colors.foreground};

  ::placeholder {
    color: hsl(0 0% 100% / 65%);
  }
`;

interface TextAreaProps extends React.ComponentPropsWithoutRef<"textarea"> {
  right?: React.ReactNode;
}

const TextArea = React.forwardRef(function TextArea(
  { right, ...props }: TextAreaProps,
  ref: React.ForwardedRef<HTMLTextAreaElement>
) {
  return (
    <Container>
      <StyledTextArea
        {...props}
        ref={ref}
        style={{ resize: "none", ...props.style }}
      />
      {right}
    </Container>
  );
});

export { TextArea };
