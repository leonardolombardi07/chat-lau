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

const Container = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  overflow-y: auto;
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
      <Spinner active={isLoading} style={{ marginBottom: -6 }} />

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

      <FooterText>
        ChatLAU Versão 2023. Nosso objetivo é tornar sua vida miserável de forma
        gratuíta e acessível. Seu feedback será totalmente ignorado.
      </FooterText>

      <MobileSpacer />
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  position: sticky;
  bottom: 0;
  padding: 10px 1em 0;
  width: 100%;
  background-color: ${(p) => p.theme.colors.background};
  text-align: center;

  @media ${(p) => p.theme.breakpoint.mobile} {
    padding: 10px 1em;
  }
`;

const FooterText = styled.p`
  text-align: center;

  @media ${(p) => p.theme.breakpoint.mobile} {
    display: none;
  }
`;

const MobileSpacer = styled.div`
  @media ${(p) => p.theme.breakpoint.mobile} {
    height: 50px;
  }
`;

export { Main };