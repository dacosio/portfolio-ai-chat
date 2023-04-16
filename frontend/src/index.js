import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { apiClient } from "./state/api";

export const store = configureStore({
  reducer: { [apiClient.reducerPath]: apiClient.reducer },
  middleware: (getDefault) => getDefault().concat(apiClient.middleware),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
