import { ChatCompletionRequestMessage } from "openai";
import { useChat } from "../context";
import React from "react";

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
        <Message key={m.content} message={m} />
      ))}

      <div ref={scrollToBottomRef} />
    </Container>
  );
}

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        flex: 1,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        paddingBottom: "1em",
      }}
    >
      {children}
    </div>
  );
}

function Message({ message }: { message: ChatCompletionRequestMessage }) {
  return (
    <div
      style={{
        width: "100%",
        background: message.role === "assistant" ? "#FFCC00" : undefined,
        color: message.role === "assistant" ? "hsl(278, 73%, 19%)" : undefined,
        padding: "1em",
        borderBottom: "1px black solid",
      }}
    >
      {message.content}
    </div>
  );
}

export { Messages };
