import axios from "axios";

import { LoginPropsType } from "../schemas";

type TokenResponseType = {
  access: string;
  refresh: string;
  user_id: string | number;
};

export const getUserToken = async (credentials: LoginPropsType) => {
  const { data } = await axios.post("/auth/token", credentials);
  return data as TokenResponseType;
};

export const getAccessToken = async (refreshToken: string) => {
  const { data } = await axios.post("/auth/refresh", {
    refresh: refreshToken,
  });
  return data as Pick<TokenResponseType, "access">;
};
