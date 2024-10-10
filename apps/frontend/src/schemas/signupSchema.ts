import * as yup from "yup";

import { LIMITS, MESSAGES } from "../constants";

export const signupSchema = yup.object().shape({
  firstName: yup.string().required(MESSAGES.FIRST_NAME_REQUIRED),
  lastName: yup.string().required(MESSAGES.LAST_NAME_REQUIRED),
  email: yup.string().email().required(MESSAGES.EMAIL_REQUIRED),
  password: yup
    .string()
    .min(LIMITS.PASSWORD[0], MESSAGES.PASSWORD_MIN)
    .max(LIMITS.PASSWORD[1], MESSAGES.PASSWORD_MAX)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      MESSAGES.PASSWORD_COMPLEXITY
    )
    .required(MESSAGES.PASSWORD_REQUIRED),
});

export type SignUpPropsType = yup.InferType<typeof signupSchema>;
