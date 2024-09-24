import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      {" "}
      {/* Wrap your app in BrowserRouter */}
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
