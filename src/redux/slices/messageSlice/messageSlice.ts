import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import {
  IMessageData,
  MessagesState,
} from "../../../components/pages/messages/types";

export const initialState: MessagesState = {
  messagesList: [],
  status: "idle",
  error: null,
};

export const addMessage = createAsyncThunk(
  "message/addMessage",
  async (messageData: IMessageData, { rejectWithValue }) => {
    const db = getFirestore();
    try {
      await addDoc(collection(db, "messages"), {
        userId: messageData.userId,
        message: messageData.message,
      });
    } catch (error: any) {
      rejectWithValue(error.message);
    }
  }
);

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessages(state, action: PayloadAction<[] | IMessageData[]>) {
      state.messagesList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addMessage.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(addMessage.fulfilled, (state) => {
      state.status = "succeeded";
    });

    builder.addCase(
      addMessage.rejected,
      (state, action: PayloadAction<any>) => {
        state.error = action.payload;
        state.status = "rejected";
      }
    );
  },
});
export const { setMessages } = messageSlice.actions;
export default messageSlice.reducer;
