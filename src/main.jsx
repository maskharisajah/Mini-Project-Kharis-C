import React from "react";
import ReactDOM from "react-dom/client";
import App from "./routes/App";
import { TokenProvider } from "./utils/states/context/token-context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <TokenProvider>
    <App />
  </TokenProvider>
);
