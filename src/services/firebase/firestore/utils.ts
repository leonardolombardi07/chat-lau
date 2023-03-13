import type {
  CollectionReference,
  DocumentData,
  Firestore,
} from "firebase/firestore";
import { collection } from "firebase/firestore";
import type { CollectionName } from "../types";
import { getServices } from "../app";
import { Chat, Message } from "./types";

const { firestore } = getServices();

function getTypedCollection<T = DocumentData>(
  firestore: Firestore,
  name: CollectionName
) {
  return collection(firestore, name) as CollectionReference<T>;
}

function getCollections() {
  const chatsCol = getTypedCollection<Chat>(firestore, "chats");

  function messagesCol(chatId: string) {
    return collection(
      firestore,
      "chats",
      chatId,
      "messages"
    ) as CollectionReference<{ messages: Message[] }>;
  }

  return { chatsCol, messagesCol };
}

export { getCollections };
