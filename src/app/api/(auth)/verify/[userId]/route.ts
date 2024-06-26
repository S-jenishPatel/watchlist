import dbConnect from "@/lib/dbConnection";
import User from "@/models/user.model";
import { verifySchema } from "@/schemas";
import { NextRequest } from "next/server";
import * as z from "zod";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  await dbConnect();

  const { userId } = params;
  const body = await request.json();

  const validatedFields = verifySchema.safeParse(body);
  if (!validatedFields.success) {
    return Response.json(
      { message: "Invalid Verification code" },
      { status: 400 }
    );
  }

  const { verifyCode } = validatedFields.data;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return Response.json(
        { message: "Verification Link is invalid" },
        { status: 400 }
      );
    }

    // check verify code
    if (user.verifyCode == verifyCode && user.verifyCodeExpiry > new Date()) {
      user.isVerified = true;
      await user.save();

      return Response.json(
        { message: "User verified successfully" },
        { status: 200 }
      );
    }

    return Response.json(
      {
        message: "Verification code is invalid or expired",
      },
      { status: 403 }
    );
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Failed to verify User" }, { status: 500 });
  }
}
