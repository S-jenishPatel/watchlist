import MovieCard from "@/components/movieCard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { auth } from "@/auth";
import * as z from "zod";
import Axios from "axios";

import { movieSchema, userSchema } from "@/schemas";

import { ChevronRight } from "lucide-react";
import { AlertCircle } from "lucide-react";

async function WatchlistPage() {
  const session = await auth();

  let movies: z.infer<typeof movieSchema>[];

  const options = {
    method: "GET",
    url: `${process.env.RAPID_API_URL}/titles/x/titles-by-ids`,
    params: {
      idsList: session?.user?.watchlist?.toString(),
    },
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_API_KEY,
      "X-RapidAPI-Host": process.env.RAPID_API_HOST,
    },
  };

  const result = await Axios.request(options)
    .then((res) => {
      movies = res.data.results.map((movie: any, index: number) => {
        if (movie.primaryImage) {
          return {
            id: movie.id,
            title: movie.titleText.text,
            image: movie.primaryImage.url,
            releaseYear: movie.releaseYear.year,
          };
        }
      });
      movies = movies.filter((movie) => {
        return movie != undefined;
      });
    })
    .catch((e) => {
      console.log("Watchlist page api error", e);
    });

  if (movies!) {
    return (
      <div>
        <h3 className="text-2xl font-medium my-4">
          Your Watchlisted Movies
          <ChevronRight className="inline" size={"30"} />
        </h3>
        <div className="grid grid-cols-4 gap-10 max-sm:gap-2">
          {movies!.map((movie, index) => (
            <MovieCard
              key={index}
              movie={movie}
              user={session?.user as z.infer<typeof userSchema>}
            />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <Alert className="mt-16">
        <AlertCircle className="h-5 w-5" />
        <AlertTitle>Your Watchlist is Empty</AlertTitle>
        <AlertDescription>
          Add movies to your watchlist to see them here.
        </AlertDescription>
      </Alert>
    );
  }
}

export default WatchlistPage;
