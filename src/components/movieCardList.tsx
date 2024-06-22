import MovieCard from "@/components/movieCard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import Axios from "axios";
import * as z from "zod";

import { movieSchema, userSchema } from "@/schemas";
import { IMoviesApi, searchMoviesApiData } from "@/models/movieApi.model";

import { AlertCircle, ChevronRight } from "lucide-react";

export interface TMovieCardListProps extends IMoviesApi {
  user: z.infer<typeof userSchema>;
}

async function MovieCardList({
  listTitle,
  url,
  params,
  user,
}: TMovieCardListProps) {
  let movies: z.infer<typeof movieSchema>[] = [];

  const options = {
    method: "GET",
    url: `${process.env.RAPID_API_URL}${url}`,
    params: params,
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_API_KEY,
      "X-RapidAPI-Host": process.env.RAPID_API_HOST,
    },
  };

  const result = await Axios.request(options)
    .then((res) => {
      movies = res.data.results.map((movie: any, index: number) => {
        if (movie.primaryImage && movie.releaseYear) {
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
      console.log("Movies list error", e);
    });

  if (movies.length > 0) {
    return (
      <div>
        <h3 className="text-2xl font-medium my-4">
          {listTitle}
          <ChevronRight className="inline" size={"30"} />
        </h3>
        <div className="flex gap-10 max-sm:gap-2 overflow-x-scroll pb-4 custom-scrollbar">
          {movies!.map((movie, index) => (
            <MovieCard key={index} movie={movie} user={user} />
          ))}
        </div>
      </div>
    );
  } else if (url.includes(searchMoviesApiData.url)) {
    return (
      <Alert className="mt-16">
        <AlertCircle className="h-5 w-5" />
        <AlertTitle>No Results Found</AlertTitle>
        <AlertDescription>
          Enter a valid Movie Name to display results!
        </AlertDescription>
      </Alert>
    );
  } else {
    return;
  }
}

export default MovieCardList;
