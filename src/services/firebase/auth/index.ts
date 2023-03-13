import type {
  NextOrObserver,
  User as FirebaseUser,
  UserInfo,
} from "firebase/auth";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  signInAnonymously as fbSignInAnonymously,
  linkWithPopup as fbLinkWithPopup,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { getServices } from "../app";

const { auth } = getServices();

setPersistence(auth, browserLocalPersistence);

async function signIn() {
  // TODO: we could manually get the anonymous chats
  // and add them to the account here
  return signInWithPopup(auth, new GoogleAuthProvider());
}

async function linkWithPopUp() {
  if (!auth.currentUser)
    throw new Error(`Nenhum usuário logado pra linkar a conta.`);
  return fbLinkWithPopup(auth.currentUser, new GoogleAuthProvider());
}

async function signInAnonymously() {
  if (auth.currentUser) return alert("current");
  return fbSignInAnonymously(auth);
}

async function signOut() {
  return firebaseSignOut(auth);
}

function onAuthStateChanged(nextOrObserver: NextOrObserver<FirebaseUser>) {
  return firebaseOnAuthStateChanged(auth, nextOrObserver);
}

interface User extends UserInfo {
  isAnonymous: boolean;
}

export {
  signInAnonymously,
  linkWithPopUp,
  signIn,
  signOut,
  onAuthStateChanged,
};
export type { User };
