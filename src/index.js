import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthContext, AuthProvider } from "./context";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider value={AuthContext}>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
