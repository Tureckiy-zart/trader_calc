import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import TradeContextProvider from "./components/context/tradeContext/tradeContext";

ReactDOM.render(
  <React.StrictMode>
    <TradeContextProvider>
      <App />
    </TradeContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
