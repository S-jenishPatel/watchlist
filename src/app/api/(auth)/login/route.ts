import { NextRequest } from "next/server";
import { loginSchema } from "@/schemas";
import dbConnect from "@/lib/dbConnection";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";

export async function PATCH(request: NextRequest) {
  await dbConnect();

  const body = await request.json();

  const validatedFields = loginSchema.safeParse(body);
  if (!validatedFields.success) {
    return Response.json({ message: "Invalid Credentials" }, { status: 400 });
  }

  const { email, password } = validatedFields.data;

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
