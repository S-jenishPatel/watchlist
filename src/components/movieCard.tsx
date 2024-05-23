"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

import Image from "next/image";

import * as z from "zod";
import { useEffect, useState } from "react";
import Axios from "axios";

import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

import { movieSchema } from "@/schemas";

type TMovieCardProps = {
  movie: z.infer<typeof movieSchema>;
  user: {
    id: string;
    name: string;
    email: string;
    watchlist?: [string];
  };
};

function MovieCard({ movie, user }: TMovieCardProps) {
  const [addToWatchlist, setAddToWatchlist] = useState(false);
  const [addingToWatchlist, setAddingToWatchlist] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    const addedToWatchlist = user.watchlist?.find(
      (watchlistedMovie) => watchlistedMovie === movie.id
    );
    if (addedToWatchlist) {
      setAddToWatchlist(true);
    }
  }, []);

  const onAddToWatchlist = async () => {
    setAddingToWatchlist(true);

    await Axios.post("/api/user/watchlist", {
      movieId: movie.id,
      userId: user.id,
    })
      .then((res) => {
        setAddToWatchlist((prev) => !prev);
        toast({ title: res.data.message });
      })
      .catch((error) => {
        console.log(error);
        toast({ title: error.response.data.message, variant: "destructive" });
      })
      .finally(() => {
        setAddingToWatchlist(false);
      });
  };

  return (
    <Card className="hover:shadow">
      <CardContent className="p-0">
        <Image
          src={movie.image}
          alt={movie.title}
          width={180}
          height={200}
          className="object-cover object-center w-full h-64 rounded"
        />
      </CardContent>
      <CardFooter className="justify-between items-start gap-6 p-2">
        <p className="font-medium w-28 max-sm:w-16 ">{movie.title}</p>
        <Button
          variant={"outline"}
          size={"icon"}
          disabled={addingToWatchlist}
          onClick={onAddToWatchlist}
        >
          {addToWatchlist ? (
            <FaHeart color="red" size={16} />
          ) : (
            <FaRegHeart size={16} />
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default MovieCard;
