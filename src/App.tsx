import React from "react";
import { useAuth } from "./context";
import { Router } from "./routes";
import * as Firebase from "./services/firebase";

function App() {
  const {
    actions: { setUser },
  } = useAuth();

  React.useEffect(
    function onAppMount() {
      const unsubscribe = Firebase.onAuthStateChanged({
        next: (user) => {
          if (user === null) {
            Firebase.signInAnonymously();
          }
          setUser(user);
        },
        error: (error) => {
          // TODO: maybe warn the user with a notification?
        },
        complete: () => {},
      });

      return function onUnmount() {
        unsubscribe();
      };
    },
    [setUser]
  );

  return <Router />;
}

export { App };
