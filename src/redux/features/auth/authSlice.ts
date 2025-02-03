import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getCurrentUser, signin, signout, signup } from "./operations";
import { AuthState } from "./types";

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(signout.fulfilled, state => {
        state.user = null;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        if (action.error.message?.includes("401")) {
          state.user = null;
        }
        state.error = action.error.message || "An error occurred";
      })

      .addMatcher(
        isAnyOf(signup.pending, signin.pending, getCurrentUser.pending),
        state => {
          state.isLoading = true;
          state.error = null;
        }
      )

      .addMatcher(
        isAnyOf(
          signup.fulfilled,
          signin.fulfilled,
          getCurrentUser.fulfilled,
          signout.fulfilled
        ),
        state => {
          state.isLoading = false;
          state.error = null;
        }
      )

      .addMatcher(
        isAnyOf(signup.rejected, signin.rejected, signout.rejected),
        (state, action) => {
          state.isLoading = false;
          state.user = null;
          state.error = action.error.message || "An error occurred";
        }
      );
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
