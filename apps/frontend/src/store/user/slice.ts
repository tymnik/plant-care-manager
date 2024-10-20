import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import { deleteToken } from "../../api";
import { Token, User } from "../../types";
import { getCurrentUser, login, refreshCurrentUser, signup } from "./thunks";

export interface UserState {
  user: User;
  token: Token;
  isLoading: boolean;
  isLoggedIn: boolean;
  isRefreshing: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: {
    firstName: "",
    lastName: "",
    email: "",
  },
  token: { id: "", refresh: undefined },
  isLoggedIn: false,
  isLoading: false,
  isRefreshing: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => resetState(state),
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, setUser)
      .addCase(login.rejected, onReject)
      .addCase(login.pending, onPending)
      .addCase(signup.fulfilled, setUser)
      .addCase(signup.rejected, onReject)
      .addCase(signup.pending, onPending)
      .addCase(
        getCurrentUser.fulfilled,
        (state: UserState, action: PayloadAction<{ user: User }>) => {
          state.user = action.payload.user;
          state.isLoggedIn = true;
          state.isLoading = false;
          state.isRefreshing = false;
          state.error = null;
        }
      )
      .addCase(getCurrentUser.rejected, onReject)
      .addCase(getCurrentUser.pending, (state) => {
        state.isRefreshing = true;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(refreshCurrentUser.fulfilled, setUser)
      .addCase(refreshCurrentUser.rejected, resetState)
      .addCase(refreshCurrentUser.pending, onPending);
  },
});

function resetState(state: UserState) {
  state.user = initialState.user;
  state.token = initialState.token;
  state.isLoggedIn = false;
  state.isLoading = false;
  state.isRefreshing = false;
  state.error = null;

  deleteToken();
}

function onSuccess(state: UserState) {
  state.isLoading = false;
  state.error = null;
}

function onReject(state: UserState, action: { payload?: string }) {
  state.isRefreshing = false;
  state.isLoading = false;
  state.error = action.payload || "An error occurred";
}

function onPending(state: UserState) {
  state.isLoading = true;
  state.error = null;
}

function setUser(
  state: UserState,
  action: PayloadAction<{ user: User; token: Token }>
) {
  state.user = action.payload.user;
  state.token = action.payload.token;
  state.isLoggedIn = true;
  state.isLoading = false;
  state.error = null;
}

const userReducer = userSlice.reducer;

export default userReducer;
