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

import { movieSchema, userSchema } from "@/schemas";

type TMovieCardProps = {
  movie: z.infer<typeof movieSchema>;
  user: z.infer<typeof userSchema>;
  width?: string | undefined;
  height?: string | undefined;
};

function MovieCard({ movie, user, width, height }: TMovieCardProps) {
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
  // width={180}
  // height={200}
  return (
    <Card className={`${width} hover:shadow`}>
      <CardContent className={`${width} p-0`}>
        <Image
          src={movie.image}
          alt={movie.title}
          width={400}
          height={400}
          className={`${height} object-cover object-center rounded`}
        />
      </CardContent>
      <CardFooter className="justify-between items-start gap-6 p-2">
        <p className="font-medium flex-1">{movie.title}</p>
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
