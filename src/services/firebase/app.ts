import type { FirebaseApp } from "firebase/app";
import { getApps } from "firebase/app";
import { initializeApp } from "firebase/app";
import type { Firestore } from "firebase/firestore";
import { connectFirestoreEmulator } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import type { Auth } from "firebase/auth";
import { connectAuthEmulator } from "firebase/auth";
import { inMemoryPersistence, setPersistence } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { FIREBASE_CONFIG } from "./config";
import { EMULATOR_PORT } from "./constants";

interface FirebaseClientServices {
  app: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
}

function getRawServices(): FirebaseClientServices {
  const app = initializeApp(FIREBASE_CONFIG);
  const auth = getFirebaseAuth(app);
  const firestore = getFirestore(app);
  return { app, auth, firestore };
}

function getFirebaseAuth(app: FirebaseApp) {
  const auth = getAuth(app);

  // Let Remix handle the persistence via session cookies
  setPersistence(auth, inMemoryPersistence);
  return auth;
}

function getServices() {
  const initializedApp = getApps().at(0);
  if (!initializedApp) {
    const services = getRawServices();
    const { auth, firestore } = services;
    if (process.env.NODE_ENV === "development") {
      connectAuthEmulator(auth, `http://localhost:${EMULATOR_PORT.AUTH}`, {
        disableWarnings: true,
      });
      connectFirestoreEmulator(firestore, "localhost", EMULATOR_PORT.FIRESTORE);
    }
    return services;
  }

  return getRawServices();
}

export { getServices };
