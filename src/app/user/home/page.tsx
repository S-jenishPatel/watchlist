import MovieCardList, { TMovieCardListProps } from "@/components/movieCardList";
import { moviesApiData } from "@/models/movieApi.model";

import getUser from "@/lib/getUser";
import { auth } from "@/auth";

async function HomePage() {
  const session = await auth();
  console.log(session);
  return (
    <>
      {moviesApiData.map((movieData, index) => (
        <MovieCardList
          key={index}
          listTitle={movieData.listTitle}
          url={movieData.url}
          params={movieData.params}
          user={session?.user as TMovieCardListProps["user"]}
        />
      ))}
    </>
  );
}

export default HomePage;
