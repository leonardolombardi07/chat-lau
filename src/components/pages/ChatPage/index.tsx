import { useChat, useSidebar } from "../../../context";
import { Messages } from "./Messages";
import React from "react";
import { Icon, Message, Spinner, TextArea } from "../../../components";
import styled, { useTheme } from "styled-components";

interface ChatPageProps {
  emptyComponent: React.ReactNode;
  onSendMessage: () => void;
}

function ChatPage({ emptyComponent, onSendMessage }: ChatPageProps) {
  const {
    state: { messages },
  } = useChat();

  const {
    state: { isVisible },
  } = useSidebar();

  return (
    <Container isMobileSidebarVisible={isVisible}>
      {messages.length === 0 ? emptyComponent : <Messages />}
      <FixedInputFooter onSendMessage={onSendMessage} />
    </Container>
  );
}

const Container = styled.main<{ isMobileSidebarVisible: boolean }>`
  flex: 1;
  width: 100px;

  @media ${(p) => p.theme.breakpoint.smallerThanDesktop} {
    display: ${(p) => (p.isMobileSidebarVisible ? "none" : undefined)};
  }

  /* Internal Layout */
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
`;

function FixedInputFooter({ onSendMessage }: { onSendMessage: () => void }) {
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
  const {
    state: { isLoading, error, input },
    actions: { setInput },
  } = useChat();
  const { breakpoint } = useTheme();

  React.useEffect(
    function onInputChange() {
      // In case we set the input from somewhere else
      // (like a button in a EmptyMessages view)
      if (textAreaRef.current) {
        textAreaRef.current.focus();
      }
    },
    [input]
  );

  return (
    <FooterContainer>
      <TextArea
        ref={textAreaRef}
        value={input}
        onChange={(event) => setInput(event.target.value)}
        placeholder="Digite algo irrelevante..."
        onKeyDown={(event) => {
          if (input === "") return;
          if (isLoading) return;
          if (event.shiftKey) return; // Shift + Enter means new line, don't send message
          if (window.innerWidth < breakpoint.raw.desktop) return; // Only the button sends a message on smaller than desktop

          if (event.key === "Enter") {
            event.preventDefault();
            onSendMessage();
          }
        }}
        right={<SendButton />}
      />

      {error && (
        <Message variant="error" header="Algum erro ocorreu" content={error} />
      )}

      <SmallerThanDesktopFooterText>
        ChatLAU Versão 2023. Nosso objetivo é tornar sua vida miserável de forma
        gratuíta e acessível. Seu feedback será totalmente ignorado.
      </SmallerThanDesktopFooterText>
    </FooterContainer>
  );
}

function SendButton() {
  const {
    state: { isLoading, input },
    actions: { sendMessage },
  } = useChat();

  if (isLoading) {
    return (
      <Spinner
        active
        style={{
          position: "absolute",
          right: 20,
          marginTop: 2,
        }}
      />
    );
  }

  const disabled = input === "";

  return (
    <Icon
      role="button"
      name="send"
      size="small"
      style={{
        position: "absolute",
        right: 30,
        cursor: disabled ? undefined : "pointer",
      }}
      onClick={disabled ? undefined : sendMessage}
    />
  );
}

const FooterContainer = styled.footer`
  flex-shrink: 0;

  /* Internal Layout */
  padding: 10px 1em;
  text-align: center;

  background-color: ${(p) => p.theme.colors.background};
`;

const SmallerThanDesktopFooterText = styled.p`
  margin-top: 10px;

  @media ${(p) => p.theme.breakpoint.smallerThanDesktop} {
    display: none;
  }
`;

export { ChatPage };
