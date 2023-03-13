import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { AuthContextProvider } from "./context";
import { StylesProvider } from "./styles";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <StylesProvider>
        <App />
      </StylesProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
