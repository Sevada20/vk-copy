import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    const auth = getAuth();
    if (userData.isRegForm) {
      try {
        const res = await createUserWithEmailAndPassword(
          auth,
          userData.authData.email,
          userData.authData.password
        );
        await updateProfile(res.user, { displayName: userData.authData.name });
      } catch (error) {
        rejectWithValue(error.message);
      }
    } else {
      try {
        await signInWithEmailAndPassword(
          auth,
          userData.authData.email,
          userData.authData.password
        );
      } catch (error) {
        rejectWithValue(error.message);
      }
    }
  }
);

const initialState = {
  user: null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = "succeeded";
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      state.error = action.payload;
      state.status = "rejected";
    });
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
