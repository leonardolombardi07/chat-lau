import { ChatCompletionRequestMessage } from "openai";
import { useChat } from "../context";
import React from "react";
import styled from "styled-components";
import { MOBILE_HEADER_HEIGHT } from "../constants";

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
  height: 100%;

  @media ${(p) => p.theme.breakpoint.smallerThanDesktop} {
    padding-top: ${MOBILE_HEADER_HEIGHT};
  }

  /* Internal Layout */
  display: flex;
  flex-direction: column;
  padding-bottom: 1em;

  overflow-y: scroll;
`;

const Message = styled.div<{ message: ChatCompletionRequestMessage }>`
  padding: 1em;
  width: 100%;
  background-color: ${(p) =>
    p.message.role === "assistant" ? p.theme.colors.link : undefined};
  color: ${(p) =>
    p.message.role === "assistant" ? p.theme.colors.background : undefined};
  border-bottom: 1px solid ${(p) => p.theme.colors.border};
`;

export { Messages };
