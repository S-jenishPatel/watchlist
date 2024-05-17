import { NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnection";
import User from "@/models/user.model";

import { addToWatchlistSchema } from "@/schemas";

export async function POST(request: NextRequest) {
  await dbConnect();

  const body = await request.json();

  const validatedFields = addToWatchlistSchema.safeParse(body);
  if (!validatedFields.success) {
    return Response.json({ message: "Invalid Fields" }, { status: 400 });
  }

  const { userId, movieId } = validatedFields.data;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return Response.json({ message: "Invalid User ID" }, { status: 400 });
    }

    const existingMovieIndex = user.watchlist.indexOf(movieId);

    if (existingMovieIndex) {
      user.watchlist.splice(existingMovieIndex, 1);

      await user.save();

      return Response.json(
        { message: "Removed from Watchlist successfully" },
        { status: 200 }
      );
    }

    user.watchlist.push(movieId);
    await user.save();

    return Response.json(
      { message: "Added to Watchlist successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return Response.json(
      { message: "Failed to add to watchlist" },
      { status: 500 }
    );
  }
}
