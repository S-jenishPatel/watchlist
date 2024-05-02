import { NextRequest } from "next/server";
import { loginSchema } from "@/schemas";
import * as z from "zod";
import dbConnect from "@/lib/dbConnection";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";

dbConnect();

export async function GET(request: NextRequest) {
  const { email, password }: z.infer<typeof loginSchema> = await request.json();

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return Response.json(
        { message: "Email entered is incorrect" },
        { status: 404 }
      );
    }

    if (!user?.isVerified) {
      return Response.json(
        { message: "Please verify your account in your email" },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user!.password);
    if (!isPasswordValid) {
      return Response.json(
        { message: "Password entered is incorrect" },
        { status: 403 }
      );
    }

    return Response.json(
      { message: "User logged in successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Failed to login" }, { status: 500 });
  }
}
