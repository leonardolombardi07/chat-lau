import { useChat } from "../context";
import { EmptyMessages } from "./EmptyMessages";
import { Messages } from "./Messages";
import React from "react";
import { ErrorMessage, Spinner, TextArea } from "../../../components";
import styled from "styled-components";

function Main() {
  const {
    state: { messages },
  } = useChat();

  return (
    <Container>
      {messages.length === 0 ? <EmptyMessages /> : <Messages />}
      <FixedInputFooter />
    </Container>
  );
}

const FOOTER_HEIGHT = "100px";

const Container = styled.main`
  flex: 1;

  /* To make sure footer content doesn't go on top of messages */
  padding-bottom: ${FOOTER_HEIGHT};
`;

function FixedInputFooter() {
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
  const {
    state: { isLoading, error, input },
    actions: { sendMessage, setInput },
  } = useChat();

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
      <Spinner active={isLoading} style={{ position: "absolute", top: -15 }} />

      <TextArea
        ref={textAreaRef}
        value={input}
        onChange={(event) => setInput(event.target.value)}
        placeholder="Digite algo irrelevante..."
        onKeyDown={(event) => {
          if (event.shiftKey) return;
          if (event.key === "Enter") {
            event.preventDefault();
            sendMessage(input);
            setInput("");
          }
        }}
      />

      {error && <ErrorMessage header="Algum erro ocorreu" content={error} />}

      <SmallerThanDesktopFooterText>
        ChatLAU Versão 2023. Nosso objetivo é tornar sua vida miserável de forma
        gratuíta e acessível. Seu feedback será totalmente ignorado.
      </SmallerThanDesktopFooterText>
    </FooterContainer>
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
