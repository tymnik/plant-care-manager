import * as yup from "yup";

import { LIMITS, MESSAGES } from "../constants";

export const loginSchema = yup.object().shape({
  email: yup.string().email(MESSAGES.EMAIL).required(MESSAGES.EMAIL_REQUIRED),
  password: yup
    .string()
    .min(LIMITS.PASSWORD[0], MESSAGES.PASSWORD_MIN)
    .max(LIMITS.PASSWORD[1], MESSAGES.PASSWORD_MAX)
    .required(MESSAGES.PASSWORD_REQUIRED),
});

export type LoginPropsType = yup.InferType<typeof loginSchema>;