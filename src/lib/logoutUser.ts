"use server";

import { signOut } from "@/auth";
import { AFTER_LOGOUT_ROUTE } from "@/routes";

async function logoutUser() {
  return await signOut({ redirectTo: AFTER_LOGOUT_ROUTE });
}

export default logoutUser;
