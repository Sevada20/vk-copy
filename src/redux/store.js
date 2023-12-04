import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice/authSlice";
import postSlice from "./slices/postSlice/postSlice";
import messageSlice from "./slices/messageSlice/messageSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    posts: postSlice,
    messages: messageSlice,
  },
});

export default store;
