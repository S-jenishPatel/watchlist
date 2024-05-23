"use server";
import { auth } from "@/auth";

async function getUser() {
  const session = await auth();

  return session;
}

export default getUser;
