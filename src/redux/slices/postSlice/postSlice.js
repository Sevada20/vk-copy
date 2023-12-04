import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, collection, getFirestore } from "firebase/firestore";

export const addPost = createAsyncThunk(
  "posts/addPost",
  async (postData, { rejectWithValue }) => {
    const db = getFirestore();
    try {
      await addDoc(collection(db, "posts"), {
        author: postData.user,
        content: postData.content,
        createdAt: "10 minute ago",
      });
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

const initialState = {
  posts: [],
  status: "idle",
  error: null,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addPost.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(addPost.fulfilled, (state, action) => {
      state.status = "succeeded";
    });

    builder.addCase(addPost.rejected, (state, action) => {
      state.error = action.payload;
      state.status = "rejected";
    });
  },
});
export const { setPosts } = postSlice.actions;
export default postSlice.reducer;
