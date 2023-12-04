import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, collection, getFirestore } from "firebase/firestore";

export const addMessage = createAsyncThunk(
  "message/addMessage",
  async (messageData, { rejectWithValue }) => {
    const db = getFirestore();
    try {
      await addDoc(collection(db, "messages"), {
        userId: messageData.userId,
        message: messageData.message,
      });
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

const initialState = {
  messagesList: [],
  status: "idle",
  error: null,
};

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessages(state, action) {
      state.messagesList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addMessage.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(addMessage.fulfilled, (state, action) => {
      state.status = "succeeded";
    });

    builder.addCase(addMessage.rejected, (state, action) => {
      state.error = action.payload;
      state.status = "rejected";
    });
  },
});
export const { setMessages } = messageSlice.actions;
export default messageSlice.reducer;
