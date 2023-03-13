import {
  doc,
  query,
  setDoc,
  where,
  onSnapshot,
  DocumentData,
} from "firebase/firestore";
import { QueryObserver } from "../../types";
import type { Chat, Message } from "../types";
import { getCollections } from "../utils";

export const { chatsCol, messagesCol } = getCollections();

function onUserChatsSnapshot(uid: string, observer: QueryObserver<Chat>) {
  const userChatsQuery = query(chatsCol, where("uid", "==", uid));
  return onSnapshot(userChatsQuery, observer);
}

function onChatMessagesSnapshot(
  chatId: string,
  observer: QueryObserver<DocumentData>
) {
  return onSnapshot(messagesCol(chatId), observer);
}

function createChat(
  uid: string,
  form: Pick<Chat, "title"> & { messages: Message[] }
) {
  const chatDoc = doc(chatsCol);
  setDoc(chatDoc, {
    title: form.title,
    updatedAt: new Date(),
    uid,
    id: chatDoc.id,
  });

  setDoc(getChatMessagesDoc(chatDoc.id), {
    messages: form.messages,
  });
  return chatDoc.id;
}

function editChatMessages(chatId: string, messages: Message[]) {
  // We are setting the entire doc here. Maybe using arrayUnion is more performant
  setDoc(getChatMessagesDoc(chatId), { messages });
}

function getChatMessagesDoc(chatId: string) {
  // IMPORTANT: we use the chat Id as the message document
  // id to be able to fetch the messagesDoc with the chatId
  return doc(messagesCol(chatId), chatId);
}

export {
  onUserChatsSnapshot,
  onChatMessagesSnapshot,
  createChat,
  editChatMessages,
};
