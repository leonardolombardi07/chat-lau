import { useLocation } from "react-router-dom";
import { useChat } from "../../context";
import * as Firebase from "../../services/firebase";
import { ChatPage as ChatPageComponent, Spinner } from "../../components";
import React from "react";
import styled from "styled-components";

function useChatId() {
  const { pathname } = useLocation();
  return pathname.replace("/", "");
}

function ChatPage() {
  const chatId = useChatId();
  const {
    actions: { setMessages, sendMessage },
  } = useChat();

  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const unsubscribe = Firebase.onChatMessagesSnapshot(chatId, {
      next: (snap) => {
        const messages = snap.docs.map((d) => ({ ...d.data() }));
        setMessages(messages[0].messages);
        setIsLoading(false);
      },
      error: (error) => {
        setError(
          `Algum erro ocorreu para obter as mensagens do chat ${chatId}: "${error.message}"`
        );
        setIsLoading(false);
      },
      complete: () => {
        setIsLoading(false);
      },
    });

    return function onUnmount() {
      unsubscribe();
    };
  }, [chatId, setMessages]);

  async function onSendMessage() {
    const messages = await sendMessage();
    if (!messages) return;

    Firebase.editChatMessages(chatId, messages);
  }

  return (
    <ChatPageComponent
      emptyComponent={<EmptyMessages isLoading={isLoading} error={error} />}
      onSendMessage={onSendMessage}
    />
  );
}

function EmptyMessages({
  isLoading,
  error,
}: {
  isLoading: boolean;
  error: string | null;
}) {
  return (
    <EmptyMessagesContainer>
      <Spinner active={isLoading} style={{ marginTop: "1em" }} />
    </EmptyMessagesContainer>
  );
}

const EmptyMessagesContainer = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
`;

export { ChatPage };
