import axios from "axios";

import { LoginPropsType } from "../schemas";

type TokenResponseType = {
  access: string;
  refresh: string;
  user_id: string | number;
};

export const getUserToken = async (credentials: LoginPropsType) => {
  const { data } = await axios.post("/???", credentials);
  return data as TokenResponseType;
};

export const getAccessToken = async (refreshToken: string) => {
  const { data } = await axios.post("/???", {
    refresh: refreshToken,
  });
  return data as Pick<TokenResponseType, "access">;
};
