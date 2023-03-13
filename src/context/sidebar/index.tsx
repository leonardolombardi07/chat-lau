import React from "react";

interface ISidebarContext {
  state: {
    isVisible: boolean;
  };
  actions: {
    open: () => void;
    close: () => void;
  };
}

const SidebarContext = React.createContext<ISidebarContext | null>(null);

function SidebarContextProvider({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = React.useState(false);
  const open = React.useCallback(() => setIsVisible(true), []);
  const close = React.useCallback(() => setIsVisible(false), []);

  const value: ISidebarContext = React.useMemo(() => {
    return {
      state: { isVisible },
      actions: { open, close },
    };
  }, [isVisible, open, close]);

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
}

function useSidebar() {
  const chat = React.useContext(SidebarContext);
  if (!chat) {
    throw new Error(
      "useSidebar must be used in a component wrapped by a SidebarContextProvider"
    );
  }
  return chat;
}

export { SidebarContextProvider, useSidebar };
