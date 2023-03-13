import React, { Dispatch, SetStateAction } from "react";
import { User } from "../../services/firebase";
import * as Firebase from "../../services/firebase";

interface IAuthContext {
  state: {
    isLoading: boolean;
    user: User | null;
    error: string | null;
  };

  actions: {
    setUser: Dispatch<SetStateAction<User | null>>;
    signIn: () => Promise<{ cancelled: boolean }>;
    linkAccount: () => Promise<void>;
    signOut: () => Promise<void>;
  };
}

const AuthContext = React.createContext<IAuthContext | null>(null);

function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [user, setUser] = React.useState<User | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const signIn = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      await Firebase.signIn();
      return { cancelled: false };
    } catch (error: any) {
      if (
        (typeof error?.message === "string" &&
          error.message.includes("auth/popup-closed-by-user")) ||
        error.messsage.includes("auth/cancelled-popup-request")
      ) {
        return { cancelled: true };
      }
      setError(error.message || "Erro desconhecido");
      return { cancelled: false };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const linkAccount = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      await Firebase.linkWithPopUp();
    } catch (error: any) {
      setError(error.message || "Erro desconhecido");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signOut = React.useCallback(async () => {
    await Firebase.signOut();
  }, []);

  const value: IAuthContext = React.useMemo(() => {
    return {
      state: { isLoading, user, error },
      actions: { setUser, signIn, linkAccount, signOut },
    };
  }, [isLoading, user, error, signIn, signOut, linkAccount]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const auth = React.useContext(AuthContext);
  if (!auth) {
    throw new Error(
      `${useAuth.name} must be used in a component wrapped by a ${AuthContextProvider.name}`
    );
  }
  return auth;
}

export { useAuth, AuthContextProvider };
