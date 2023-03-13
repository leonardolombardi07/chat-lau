import { HTMLAttributes } from "react";
import styled, { css } from "styled-components";

interface MessageProps extends HTMLAttributes<HTMLDivElement> {
  variant: "error" | "info";
  children?: React.ReactNode;

  header?: string;
  content?: string;
}

function Message({
  variant,
  children,
  header,
  content,
  ...props
}: MessageProps) {
  switch (variant) {
    case "error": {
      return (
        <ErrorContainer {...props}>
          {header && <MessageHeader>{header}</MessageHeader>}
          {content && <MessageContent>{content}</MessageContent>}
          {children}
        </ErrorContainer>
      );
    }

    case "info": {
      return (
        <InfoContainer {...props}>
          {header && <MessageHeader>{header}</MessageHeader>}
          {content && <MessageContent>{content}</MessageContent>}
          {children}
        </InfoContainer>
      );
    }

    default:
      throw new Error(
        `Unknown variant "${variant}" for ${Message.name} component`
      );
  }
}

const base = css`
  border-radius: 0.25rem;
  padding: 0.5em 1em;
  margin: 1em 0;
  text-align: left;
`;

const ErrorContainer = styled.div`
  ${base};

  background-color: ${(p) => p.theme.colors.error};
  border: 1px solid ${(p) => p.theme.colors.border};
`;

const InfoContainer = styled.div`
  ${base};

  background-color: ${(p) => p.theme.colors.info};
  border: 1px solid ${(p) => p.theme.colors.info};
`;

const MessageHeader = styled.h3``;
const MessageContent = styled.p`
  margin: 0;
`;

Message.Header = MessageHeader;
Message.Content = MessageContent;

export { Message };
