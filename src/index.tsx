import React from "react";
import ReactDOM from "react-dom/client";
import { Router } from "./routes";
import { StylesProvider } from "./styles";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <StylesProvider>
      <Router />
    </StylesProvider>
  </React.StrictMode>
);
