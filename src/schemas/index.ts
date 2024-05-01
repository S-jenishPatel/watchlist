import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email("Valid Email is required"),
  password: z.string().min(1, "Password is required"),
});

export const signupSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Valid Email is required"),
  password: z.string().min(6, "Password must be atleast 6 characters"),
});
