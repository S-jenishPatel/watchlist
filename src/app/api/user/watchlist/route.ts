import dbConnect from "@/lib/dbConnection";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  await dbConnect();
  const { userId, movieId } = await request.json();
}
