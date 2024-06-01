import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { searchMovieSchema } from "@/schemas";

function SearchBar() {
  const form = useForm<z.infer<typeof searchMovieSchema>>({
    resolver: zodResolver(searchMovieSchema),
    defaultValues: {
      name: "",
    },
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = async (data: z.infer<typeof searchMovieSchema>) => {};

  return (
    <form
      className="flex gap-2 items-center w-1/3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        {...register("name", { required: true })}
        type="text"
        placeholder="Search any Movie or Tv show"
      />
      <Button
        type="submit"
        disabled={isSubmitting}
        className="p-3 rounded-full"
      >
        <Search size={"16px"} />
      </Button>
    </form>
  );
}

export default SearchBar;

// <Input placeholder="Search any Movie or Tv show" />
// <Button className="p-3 rounded-full">
//   <Search size={"16px"} />
// </Button>
