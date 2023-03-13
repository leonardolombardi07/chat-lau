import styled from "styled-components";
import { Message, Spinner } from "../../../components";
import { MOBILE_HEADER_HEIGHT, SIDEBAR_WIDTH } from "../constants";
import { useAuth, useChat, useSidebar } from "../../../context";
import * as Firebase from "../../../services/firebase";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Footer } from "./Footer";

function Sidebar() {
  const {
    state: { chats },
    actions: { setChats, resetMessages },
  } = useChat();

  const {
    state: { isVisible },
    actions: { close },
  } = useSidebar();

  const {
    state: { user, error: authError },
  } = useAuth();

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [isLoadingChats, setIsLoadingChats] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!user?.uid) return;

    const unsubscribe = Firebase.onUserChatsSnapshot(user?.uid, {
      next: (snap) => {
        setChats(snap.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setIsLoadingChats(false);
      },
      error: (error) => {
        setError(
          `Algum erro ocorreu para obter seus chats: "${error.message}"`
        );
        setIsLoadingChats(false);
      },
      complete: () => setIsLoadingChats(false),
    });

    return function onUnmount() {
      unsubscribe();
    };
  }, [user?.uid, setChats]);

  function onChatButtonClick(to: string) {
    if (pathname !== to) {
      resetMessages();
    }

    close();
    navigate(to);
  }

  return (
    <SidebarContainer isMobileSidebarVisible={isVisible}>
      <SidebarContent>
        <ChatButton isActive={false} onClick={() => onChatButtonClick("/")}>
          {"Novo chat"}
        </ChatButton>

        <AuthError error={authError} />

        <AnonymousUserMessage
          isVisible={Boolean(user?.isAnonymous) && chats.length > 0}
        />

        {chats.map((chat) => (
          <ChatButton
            key={chat.id}
            isActive={pathname.replace("/", "") === chat.id}
            onClick={() => onChatButtonClick(`/${chat.id}`)}
          >
            {chat.title}
          </ChatButton>
        ))}

        <Spinner
          active={isLoadingChats}
          style={{ marginTop: 10, marginLeft: 4 }}
        />

        <FetchUserChatsError error={error} />
      </SidebarContent>

      <Footer />
    </SidebarContainer>
  );
}

const SidebarContainer = styled.aside<{ isMobileSidebarVisible: boolean }>`
  width: ${SIDEBAR_WIDTH};
  height: 100vh;

  @media ${(p) => p.theme.breakpoint.smallerThanDesktop} {
    display: ${(p) => (p.isMobileSidebarVisible ? undefined : "none")};
    width: 100vw;
    padding-top: ${MOBILE_HEADER_HEIGHT};
  }

  /* Internal Layout */
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;

  border-right: 1px solid ${(p) => p.theme.colors.border};
  overflow: hidden;
`;

const SidebarContent = styled.div`
  flex-grow: 1;

  /* Internal Layout */
  padding: 0.5em;
  text-align: center;

  overflow: auto;
`;

const ChatButton = styled.div<{ isActive: boolean }>`
  width: 100%;
  max-height: 60px;
  border: 1px solid ${(p) => p.theme.colors.border};
  border-radius: 5px;
  margin-bottom: 10px;
  outline: ${(p) =>
    `${p.isActive ? `${p.theme.colors.link} solid 2px` : undefined}`};
  cursor: pointer;

  /* Internal Layout */
  padding: 5px;

  text-overflow: ellipsis;
  overflow: hidden;
`;

function AnonymousUserMessage({ isVisible }: { isVisible: boolean }) {
  const {
    actions: { linkAccount },
  } = useAuth();

  if (!isVisible) return null;

  return (
    <Message variant="info" style={{ textAlign: "center" }}>
      <Message.Content>
        Você está utilizando o ChatLAU anonimamente.
      </Message.Content>

      <Message.Content>
        <b>
          <a
            href="/"
            onClick={(event) => {
              event.preventDefault();
              linkAccount();
            }}
          >
            Clique aqui
          </a>
        </b>{" "}
        se quiser salvar essas conversas
      </Message.Content>
    </Message>
  );
}

function FetchUserChatsError({ error }: { error: string | null }) {
  if (!error) return null;

  return (
    <Message variant="error" style={{ textAlign: "center" }}>
      <p style={{ marginBottom: 5 }}> Não vendo o que esperava aqui? </p>
      <Message.Header>
        <b>SE FUDEU.</b>
      </Message.Header>
      <small> Erro: {error}</small>
    </Message>
  );
}

function AuthError({ error }: { error: string | null }) {
  if (!error) return null;
  if (error.includes("auth/popup-closed-by-user")) return null;
  if (error.includes("auth/cancelled-popup-request")) return null;

  return (
    <Message variant="error" style={{ textAlign: "center" }}>
      <Message.Header>
        <b>DEU RUIM.</b>
      </Message.Header>
      <small> Erro: {humanReadableError(error)}</small>
    </Message>
  );
}

function humanReadableError(error: string) {
  if (error.includes("auth/credential-already-in-use")) {
    return `Essa conta já foi usada no passado. Não to afim de salvar essas conversas. 
    Se quiser salvar essas conversas, salva em outra conta.
    Se quiser entrar na conta antiga, clica em "Entrar".`;
  }
  return `Erro desconhecido: ${error}`;
}

export { Sidebar };
