"use server";

import { loginSchema } from "./../schemas/index";
import { signIn } from "@/auth";
import { AFTER_LOGIN_ROUTE } from "@/routes";
import * as z from "zod";

type TLoginUserProps = {
  data?: z.infer<typeof loginSchema>;
  provider?: "google" | "github";
};

async function loginUser({ data, provider }: TLoginUserProps) {
  if (data) {
    const validatedFields = loginSchema.safeParse(data);
    if (!validatedFields.success) {
      return { message: "Invalid Credentials" };
    }

    const { email, password } = validatedFields.data;

    return await signIn("credentials", {
      email,
      password,
      redirectTo: AFTER_LOGIN_ROUTE,
    });
  } else if (provider) {
    return await signIn(provider, { redirectTo: AFTER_LOGIN_ROUTE });
  }
}

export default loginUser;
