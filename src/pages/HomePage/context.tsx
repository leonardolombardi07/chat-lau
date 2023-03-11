import React, { Dispatch, SetStateAction } from "react";
import {
  ChatCompletionRequestMessage,
  generateAnswer,
} from "../../services/api";

interface IChatContext {
  state: {
    input: string;
    isLoading: boolean;
    messages: ChatCompletionRequestMessage[];
    error: string | null;
  };
  actions: {
    setInput: Dispatch<SetStateAction<string>>;
    sendMessage: (input: string) => void;
    resetMessages: () => void;
  };
}

const ChatContext = React.createContext<IChatContext | null>(null);

function ChatContextProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [messages, setMessages] = React.useState<
    ChatCompletionRequestMessage[]
  >([]);
  const [error, setError] = React.useState<string | null>(null);
  const [input, setInput] = React.useState("");

  const sendMessage = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const userMessage: ChatCompletionRequestMessage = {
        role: "user",
        content: input,
      };
      const withUserMessage = [...messages, userMessage];
      setMessages(withUserMessage);
      const withAIMessage = await generateAnswer(withUserMessage, input);
      setMessages(withAIMessage);
    } catch (error: any) {
      console.log(error);
      setError(
        `Algo de errado ocorreu. Esse é o erro do chat: ${error.message}`
      );
      setMessages(messages); // Rollback to initial state
    } finally {
      setIsLoading(false);
    }
  }, [messages, input]);

  const resetMessages = React.useCallback(() => {
    setMessages([]);
  }, []);

  const value = React.useMemo(() => {
    return {
      state: { isLoading, messages, error, input },
      actions: { sendMessage, setInput, resetMessages },
    };
  }, [input, isLoading, messages, error, sendMessage, resetMessages]);

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

function useChat() {
  const chat = React.useContext(ChatContext);
  if (!chat) {
    throw new Error(
      "useChat must be used in a component wrapped by a ChatContextProvider"
    );
  }
  return chat;
}

export { ChatContextProvider, useChat };
