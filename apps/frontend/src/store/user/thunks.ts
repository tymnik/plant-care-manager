import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import {
  fetchCurrentUser,
  loginUser,
  refreshUser,
  registerUser,
} from "../../api";
import { LoginPropsType, SignUpPropsType } from "../../schemas";

import { UserState } from "./slice";

type UserResponse = Pick<UserState, "user" | "token">;

export interface ErrorResponse {
  message: string;
}

export const signup = createAsyncThunk<
  UserResponse,
  SignUpPropsType,
  { rejectValue: string }
>("auth/signup", async (credentials, thunkAPI) => {
  try {
    const user = await registerUser(credentials);
    return user;
  } catch (err) {
    const error = err as AxiosError<ErrorResponse>;
    const defaultMessage = "Registration failed";
    const errorMessage = error?.response?.data?.message || defaultMessage;
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const login = createAsyncThunk<
  UserResponse,
  LoginPropsType,
  { rejectValue: string }
>("auth/login", async (credentials, thunkAPI) => {
  try {
    const user = await loginUser(credentials);
    return user;
  } catch (err) {
    const error = err as AxiosError<ErrorResponse>;
    const defaultMessage = "Login failed";
    const errorMessage = error?.response?.data?.message || defaultMessage;
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const getCurrentUser = createAsyncThunk<
  Pick<UserState, "user">,
  void,
  { rejectValue: string }
>("auth/me", async (_, thunkAPI) => {
  try {
    const user = await fetchCurrentUser();
    return { user };
  } catch (err) {
    const error = err as AxiosError<ErrorResponse>;
    const defaultMessage = "Get current user failed";
    const errorMessage = error?.response?.data?.message || defaultMessage;
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const refreshCurrentUser = createAsyncThunk<
  UserResponse,
  { refresh: string },
  { rejectValue: string }
>("auth/refresh", async (token, thunkAPI) => {
  try {
    const user = await refreshUser(token);
    return user;
  } catch (err) {
    const error = err as AxiosError<ErrorResponse>;
    const defaultMessage = "Refresh user failed";
    const errorMessage = error?.response?.data?.message || defaultMessage;
    return thunkAPI.rejectWithValue(errorMessage);
  }
});
