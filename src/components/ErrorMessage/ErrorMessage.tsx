import styled from "styled-components";

const ErrorContainer = styled.div`
  background-color: ${(p) => p.theme.colors.error};
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  margin: 1em 0;
`;

interface ErrorMessageProps {
  header: string;
  content: string;
}

function ErrorMessage({ header, content }: ErrorMessageProps) {
  return (
    <ErrorContainer>
      <p>
        {header}
        <br />
        <small>{content}</small>
      </p>
    </ErrorContainer>
  );
}

export { ErrorMessage };
