import styled from "styled-components";
import { Button } from "../../../components";
import { useAuth, useChat } from "../../../context";
import React from "react";
import { SIDEBAR_WIDTH } from "../constants";
import { useNavigate } from "react-router-dom";

function Footer() {
  const {
    state: { user },
  } = useAuth();

  const isAnonymous = !user || user.isAnonymous;
  return (
    <SidebarFooterContainer>
      {isAnonymous ? <AnonymousView /> : <AuthenticatedView />}
    </SidebarFooterContainer>
  );
}

const SidebarFooterContainer = styled.div`
  flex-shrink: 0;
  width: ${SIDEBAR_WIDTH};

  @media ${(p) => p.theme.breakpoint.smallerThanDesktop} {
    width: 100vw;
  }

  /* Internal Layout */
  padding: 10px;
  text-align: center;

  border-top: 1px solid ${(p) => p.theme.colors.border};
  background-color: ${(p) => p.theme.colors.background};
`;

function AnonymousView() {
  const {
    state: { isLoading },
    actions: { signIn },
  } = useAuth();

  const {
    state: { chats },
    actions: { setChats, setMessages },
  } = useChat();

  const navigate = useNavigate();

  async function onSignIn() {
    const { cancelled } = await signIn();
    if (cancelled) return;

    setChats([]);
    setMessages([]);
    navigate("/");
  }

  return (
    <React.Fragment>
      <p>Quer ter ou entrar na sua conta? {"\n"}</p>

      <Button
        disabled={isLoading}
        variety="primary"
        style={{ width: "100%" }}
        onClick={onSignIn}
      >
        Entrar com Google
      </Button>

      {chats.length > 0 && (
        <small style={{ display: "block" }}>
          (suas conversas atuais serão perdidas)
        </small>
      )}
    </React.Fragment>
  );
}

function AuthenticatedView() {
  const {
    actions: { signOut },
  } = useAuth();

  const {
    actions: { setChats, setMessages },
  } = useChat();

  const navigate = useNavigate();

  async function onSignOut() {
    setChats([]);
    setMessages([]);

    // Hack to make sure chats/messages before
    // the signOut triggers an anonymous sign in
    // (this hides the AnonymousUser message on Sidebar content)
    setTimeout(() => signOut(), 50);
    navigate("/");
  }

  return (
    <a
      onClick={(event) => {
        event.preventDefault();
        onSignOut();
      }}
      href="/"
    >
      Meter o pé
    </a>
  );
}

export { Footer };
