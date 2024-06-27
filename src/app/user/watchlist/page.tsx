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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 sm:gap-6">
          <h3 className="col-span-full mt-2 mb-2 sm:mb-0 text-2xl font-medium">
            Your Watchlisted Movies
            <ChevronRight className="inline" size={"30"} />
          </h3>
          {movies!.map((movie, index) => (
            <MovieCard
              key={index}
              movie={movie}
              width="w-full 2xl:max-w-72"
              height="h-full"
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
