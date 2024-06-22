import CardLoading from "@/components/cardLoading";
import MovieCardList, { TMovieCardListProps } from "@/components/movieCardList";

import { auth } from "@/auth";

import { searchMoviesApiData } from "@/models/movieApi.model";

import { Suspense } from "react";

async function page({ params }: { params: { id: string } }) {
  const session = await auth();
  const { id } = params;
  console.log(id);

  return (
    <Suspense fallback={<CardLoading />}>
      <MovieCardList
        listTitle={searchMoviesApiData.listTitle}
        url={searchMoviesApiData.url + id}
        params={searchMoviesApiData.params}
        user={session?.user as TMovieCardListProps["user"]}
      />
    </Suspense>
  );
}

export default page;
