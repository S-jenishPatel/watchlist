import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

import { useRouter } from "next/navigation";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { searchMovieSchema } from "@/schemas";

function SearchBar({ className }: { className?: string | undefined }) {
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

  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof searchMovieSchema>) => {
    if (!data) {
      router.push("/user/home");
    }
    router.push("/user/home/" + data.name.toString());
  };

  return (
    <form className={`${className}`} onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("name", { required: true })}
        type="text"
        placeholder="Search any Movie or Tv Show"
      />
      <Button
        type="submit"
        disabled={isSubmitting}
        className="hidden md:block p-3 rounded-full"
      >
        <Search size={"16px"} />
      </Button>
    </form>
  );
}

export default SearchBar;
