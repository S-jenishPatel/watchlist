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

export const verifySchema = z.object({
  verifyCode: z.string().min(6, "Verification Code must be 6 Numbers"),
});

export const addToWatchlistSchema = z.object({
  userId: z.string(),
  movieId: z.string(),
});

export const movieSchema = z.object({
  id: z.string({ required_error: "Movie IMDB Id is required" }),
  title: z.string({ required_error: "Movie Title is required" }),
  image: z.string(),
  releaseYear: z.number().nullable(),
});

export const searchMovieSchema = z.object({
  name: z.string(),
});

export const userSchema = z.object({
  id: z.string({ required_error: "User Id is required" }),
  name: z.string({ required_error: "User name is required" }),
  email: z.string(),
  watchlist: z.array(z.string()).optional(),
});
