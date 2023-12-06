import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import * as firebase from "firebase/app";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";

firebase.initializeApp({
  apiKey: "AIzaSyAl3Wpz-g6THQIUhaW3vwZxpLSq3uYWCiI",
  authDomain: "vk-copy-ef874.firebaseapp.com",
  projectId: "vk-copy-ef874",
  storageBucket: "vk-copy-ef874.appspot.com",
  messagingSenderId: "217183731939",
  appId: "1:217183731939:web:6623d916bafbc36d57c5d6",
});

const root = ReactDOM.createRoot(document.getElementById("root") as Element);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
