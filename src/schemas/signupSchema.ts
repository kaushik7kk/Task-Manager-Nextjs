import { z } from "zod";

//Validation for first name.
const fnameValidation = z
  .string()
  .regex(/^[a-zA-Z]+$/, "First name can only have letters.");

//Validation for middle name.
const mnameValidation = z
.string()
.optional()
.refine(value => value === undefined || value === "" || /^[a-zA-Z]+$/.test(value), {
  message: "Middle name can only have letters",
});

//Validation for last name.
const lnameValidation = z
  .string()
  .regex(/^[a-zA-Z]+$/, "Last name can only have letters.");

//Validation for username.
export const usernameValidation = z
  .string()
  .min(4, "Username should be at least 4 characters long.")
  .max(15, "Username should be at most 15 characters long.")
  .regex(
    /^[a-zA-Z0-9._-]+$/,
    "Username can only have letters, numbers or any of ['.', '_', '-']"
  );

//Validation for email.
export const emailValidation = z.string().email({
  message: "Invalid email address",
});

//Validation for password.
export const passwordValidation = z
  .string()
  .min(8, "Password should be at least 8 characters long.")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]+$/,
    "Password should contain at least one uppercase letter, one lowercase letter, one number and one special character."
  );

export const signupSchema = z.object({
  fname: fnameValidation,
  mname: mnameValidation,
  lname: lnameValidation,
  username: usernameValidation,
  email: emailValidation,
  password: passwordValidation,
});
