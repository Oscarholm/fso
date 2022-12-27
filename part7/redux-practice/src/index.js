import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./components/App";
import "./index.css";
import noteReducer, { setNotes } from "./reducers/noteReducer";
import { configureStore } from "@reduxjs/toolkit";
import noteService from "./services/notes";

const store = configureStore({
  reducer: {
    notes: noteReducer,
  },
});


ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
