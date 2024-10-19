import axios from "axios";

import { LoginPropsType, SignUpPropsType } from "../schemas";
import { getAccessToken, getUserToken, setToken } from ".";
import { User } from "../types";
import { createFormData } from "../utils";

type UserId = string | number;

export const registerUser = async (credentials: SignUpPropsType) => {
  const { email, password, ...rest } = credentials;
  const formData = createFormData({ data: { ...rest, email, password } });

  await createUser(formData);

  const user = await loginUser({ email, password });

  return user;
};

export const loginUser = async ({ email, password }: LoginPropsType) => {
  const {
    access,
    refresh,
    user_id: id,
  } = await getUserToken({
    email,
    password,
  });

  setToken(access);

  const user = await getUserById(id);

  return { user, token: { access, refresh, id } };
};

export const refreshUser = async ({
  id,
  refresh,
}: {
  id: UserId;
  refresh: string;
}) => {
  const { access } = await getAccessToken(refresh);
  setToken(access);

  const user = await getUserById(id);

  return { user, token: { refresh, id } };
};

export const createUser = async (formData: FormData) => {
  await axios.post("auth/signup", formData);
  return true;
};

export const getUserById = async (id: UserId): Promise<User> => {
  const { data } = await axios.get(`/users/${id}`);

  const { firstName, lastName, email } = data;

  return {
    firstName,
    lastName,
    email,
  };
};
