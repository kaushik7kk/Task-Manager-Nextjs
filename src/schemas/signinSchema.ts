import { z } from "zod";
import { emailValidation, passwordValidation, usernameValidation } from "./signupSchema";

export const signinSchema = z.object({
    identifier: usernameValidation || emailValidation,
    password: passwordValidation,
})