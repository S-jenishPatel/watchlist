import MovieCardList, { TMovieCardListProps } from "@/components/movieCardList";
import { moviesApiData } from "@/models/movieApi.model";

import { auth } from "@/auth";

import { Suspense } from "react";
import CardLoading from "@/components/cardLoading";

async function HomePage() {
  const session = await auth();
  return (
    <>
      {moviesApiData.map((movieData, index) => (
        <Suspense key={index} fallback={<CardLoading />}>
          <MovieCardList
            key={index}
            listTitle={movieData.listTitle}
            url={movieData.url}
            params={movieData.params}
            user={session?.user as TMovieCardListProps["user"]}
          />
        </Suspense>
      ))}
    </>
  );
}

export default HomePage;
