import { NextRequest } from "next/server";
import { signupSchema } from "@/schemas";
import * as z from "zod";
import dbConnect from "@/lib/dbConnection";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import sendEmail from "@/lib/sendEmail";

export async function POST(request: NextRequest) {
  await dbConnect();

  const body = await request.json();

  const validatedFields = signupSchema.safeParse(body);
  if (!validatedFields.success) {
    return Response.json({ message: "Invalid fields" }, { status: 400 });
  }

  const { username, email, password } = validatedFields.data;

  try {
    const existingUsername = await User.findOne({ username, isVerified: true });
    if (existingUsername) {
      return Response.json(
        { message: "Username already exists" },
        { status: 409 }
      );
    }

    const existingUserByEmail = await User.findOne({
      email,
    });

    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return Response.json(
          { message: "Email already exists" },
          { status: 409 }
        );
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);

        const verifyCode = Math.floor(
          100000 + Math.random() * 900000
        ).toString();

        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + 2);

        const updatedUser = await User.findByIdAndUpdate(
          existingUserByEmail._id,
          {
            username,
            password: hashedPassword,
            verifyCode,
            verifyCodeExpiry: expiryDate,
          }
        );

        // send verify email
        const emailResponse = await sendEmail({
          userId: updatedUser?._id,
          username,
          email: updatedUser!.email,
          verifyCode,
        });
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 2);

      const user = await User.create({
        username,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry: expiryDate,
      });

      //   send verify email
      const emailResponse = await sendEmail({
        userId: user._id,
        username,
        email,
        verifyCode,
      });
      console.log("Email Response", emailResponse);
    }

    return Response.json(
      {
        message: "User registered successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);

    return Response.json(
      { message: "Failed to register the user" },
      { status: 500 }
    );
  }
}
