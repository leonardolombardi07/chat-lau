import { useChat } from "../context";
import { EmptyMessages } from "./EmptyMessages";
import { Messages } from "./Messages";
import React from "react";
import { ErrorMessage, Icon, Spinner, TextArea } from "../../../components";
import styled, { useTheme } from "styled-components";

interface MainProps {
  isMobileSidebarVisible: boolean;
}

function Main({ isMobileSidebarVisible }: MainProps) {
  const {
    state: { messages },
  } = useChat();

  return (
    <Container isMobileSidebarVisible={isMobileSidebarVisible}>
      {messages.length === 0 ? <EmptyMessages /> : <Messages />}
      <FixedInputFooter />
    </Container>
  );
}

const FOOTER_HEIGHT = "100px";

const Container = styled.main<MainProps>`
  flex: 1;

  /* To make sure footer content doesn't go on top of messages */
  padding-bottom: ${FOOTER_HEIGHT};

  @media ${(p) => p.theme.breakpoint.smallerThanDesktop} {
    display: ${(p) => (p.isMobileSidebarVisible ? "none" : undefined)};
  }
`;

function FixedInputFooter() {
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
  const {
    state: { error, input },
    actions: { sendMessage, setInput },
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
          if (event.shiftKey) return; // Shift + Enter means new line, not send
          if (window.innerWidth < breakpoint.raw.desktop) return; // Only the button sends messages on mobile

          if (event.key === "Enter") {
            event.preventDefault();
            sendMessage();
          }
        }}
        right={<SendButton />}
      />

      {error && <ErrorMessage header="Algum erro ocorreu" content={error} />}

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
      <Spinner active style={{ position: "absolute", right: 20, top: 35 }} />
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
  position: sticky;
  bottom: 0;
  width: 100%;
  max-height: ${FOOTER_HEIGHT};

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

export { Main };
