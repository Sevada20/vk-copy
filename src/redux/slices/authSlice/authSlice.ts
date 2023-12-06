import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { AuthState, UserData, IUser } from "./types";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData: UserData, { rejectWithValue }) => {
    const auth = getAuth();
    if (userData.isRegForm) {
      try {
        const res = await createUserWithEmailAndPassword(
          auth,
          userData.authData.email,
          userData.authData.password
        );
        await updateProfile(res.user, { displayName: userData.authData.name });
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    } else {
      try {
        await signInWithEmailAndPassword(
          auth,
          userData.authData.email,
          userData.authData.password
        );
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  }
);

const initialState: AuthState = {
  user: null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
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
    builder.addCase(loginUser.fulfilled, (state) => {
      state.status = "succeeded";
    });

    builder.addCase(loginUser.rejected, (state, action: any) => {
      state.error = action.payload;
      state.status = "rejected";
    });
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
