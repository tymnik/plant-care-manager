import axios from "axios";

import { LoginPropsType } from "../schemas";

type TokenResponseType = {
  access: string;
  refresh: string;
};

export const getUserToken = async (credentials: LoginPropsType) => {
  const { data } = await axios.post("/auth/login", credentials);

  const { access_token, refresh_token } = data;
  return {
    access: access_token,
    refresh: refresh_token,
  } as TokenResponseType;
};

export const getAccessToken = async (refreshToken: string) => {
  const { data } = await axios.post("/auth/refresh", {
    refresh: refreshToken,
  });
 
  const { access_token } = data;
  return { access: access_token } as Pick<TokenResponseType, "access">;
};
