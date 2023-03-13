import { FirestoreError, QuerySnapshot } from "firebase/firestore";

export type CollectionName = "chats" | "messages";

export interface QueryObserver<T> {
  next?: (snapshot: QuerySnapshot<T>) => void;
  error?: (error: FirestoreError) => void;
  complete?: () => void;
}
