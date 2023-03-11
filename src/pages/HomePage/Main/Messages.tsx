import { ChatCompletionRequestMessage } from "openai";
import { useChat } from "../context";
import React from "react";
import styled from "styled-components";

function Messages() {
  const scrollToBottomRef = React.useRef<HTMLDivElement>(null);
  const {
    state: { messages },
  } = useChat();

  React.useEffect(
    function onNewMessages() {
      if (scrollToBottomRef.current) {
        scrollToBottomRef.current.scrollIntoView({ behavior: "smooth" });
      }
    },
    [messages]
  );

  return (
    <Container>
      {messages.map((m) => (
        <Message key={m.content} message={m}>
          {m.content}
        </Message>
      ))}

      <div ref={scrollToBottomRef} />
    </Container>
  );
}

const Container = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 1em;
`;

const Message = styled.div<{ message: ChatCompletionRequestMessage }>`
  width: 100%;
  background-color: ${(p) =>
    p.message.role === "assistant" ? p.theme.colors.link : undefined};
  color: ${(p) =>
    p.message.role === "assistant" ? p.theme.colors.background : undefined};
  padding: 1em;
  border-bottom: 1px solid ${(p) => p.theme.colors.border};
`;

export { Messages };
