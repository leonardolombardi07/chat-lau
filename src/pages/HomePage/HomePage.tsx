import { ChatPage } from "../../components";
import { useAuth, useChat } from "../../context";
import { EmptyMessages } from "./EmptyMessages";
import * as Firebase from "../../services/firebase";
import { useNavigate } from "react-router-dom";
import * as OpenAI from "../../services/api/Api";

function HomePage() {
  const {
    actions: { sendMessage },
  } = useChat();

  const {
    state: { user },
  } = useAuth();

  const navigate = useNavigate();

  async function onSendMessage() {
    const messages = await sendMessage();
    if (!messages) return;

    const title = await OpenAI.generateTitle(messages);

    const chatId = Firebase.createChat(user?.uid || `${Math.random()}`, {
      title: title || String(messages.at(-1)?.content?.slice(0, 3)),
      messages,
    });
    navigate(`/${chatId}`);
  }

  return (
    <ChatPage
      emptyComponent={<EmptyMessages />}
      onSendMessage={onSendMessage}
    />
  );
}

export { HomePage };
