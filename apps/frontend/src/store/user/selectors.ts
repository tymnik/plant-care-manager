import { RootState } from "../store";

export const selectUser = (state: RootState) => state.user.user;

export const selectToken = (state: RootState) => state.user.token;

export const selectIsRefreshing = (state: RootState) => state.user.isRefreshing;

export const selectIsLoggedIn = (state: RootState) => state.user.isLoggedIn;

export const selectIsLoading = (state: RootState) => state.user.isLoading;

export const selectUserError = (state: RootState) => state.user.error;
