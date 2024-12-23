import axios from "axios";

import { LoginPropsType, SignUpPropsType } from "../schemas";
import { getAccessToken, getUserToken, setToken } from ".";
import { User } from "../types";

export const registerUser = async (credentials: SignUpPropsType) => {
  await createUser(credentials);

  const user = await loginUser({
    email: credentials.email,
    password: credentials.password,
  });

  return user;
};

export const loginUser = async ({ email, password }: LoginPropsType) => {
  const { access, refresh } = await getUserToken({
    email,
    password,
  });

  setToken(access);

  localStorage.setItem("accessToken", access);
  localStorage.setItem("refreshToken", refresh);

  const user = await fetchCurrentUser();

  return { user, token: { access, refresh } };
};

export const refreshUser = async ({ refresh }: { refresh: string }) => {
  const { access } = await getAccessToken(refresh);
  setToken(access);

  localStorage.setItem("accessToken", access);

  const user = await fetchCurrentUser();

  return { user, token: { access, refresh } };
};

export const createUser = async (data: SignUpPropsType) => {
  await axios.post("/auth/signup", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return true;
};

export const fetchCurrentUser = async (): Promise<User> => {
  const accessToken = localStorage.getItem("accessToken");

  const { data } = await axios.get("/user/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const { firstName, lastName, email } = data;
  return {
    firstName,
    lastName,
    email,
  };
};
