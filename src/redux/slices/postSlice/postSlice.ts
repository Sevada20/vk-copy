import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { IPostData, IPostItem, IPostsState } from "./types";

export const addPost = createAsyncThunk(
  "posts/addPost",
  async (postData: IPostData, { rejectWithValue }) => {
    const db = getFirestore();
    try {
      await addDoc(collection(db, "posts"), {
        author: postData.user,
        content: postData.content,
        createdAt: "10 minute ago",
      });
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState: IPostsState = {
  posts: [],
  status: "idle",
  error: null,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts(state, action: PayloadAction<IPostItem[] | []>) {
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

    builder.addCase(addPost.rejected, (state, action: PayloadAction<any>) => {
      state.error = action.payload;
      state.status = "rejected";
    });
  },
});
export const { setPosts } = postSlice.actions;
export default postSlice.reducer;
