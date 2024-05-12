"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "@/components/ui/use-toast";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Axios from "axios";

import { verifySchema } from "@/schemas";

import Image from "next/image";
import logo from "@/../public/watchlist logo cropped.png";

import { oswald } from "@/components/fonts";

function VerifyUserPage({ params }: { params: { userId: string } }) {
  const { userId } = params;

  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      verifyCode: "",
    },
  });
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = form;

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    await Axios.patch("/api/verify/" + userId.toString(), data)
      .then((res) => {
        console.log(res);
        toast({ title: res.data.message });
        reset();
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: error.response.data.message,
          variant: "destructive",
        });
      });
  };

  return (
    <>
      <div className="flex gap-2 pl-4 py-4 items-center border-b-2">
        <Image src={logo} alt="Wishlist logo" className="w-16 rounded-full" />
        <span className={`text-5xl  font-600 ${oswald.className}`}>
          Watchlist
        </span>
      </div>
      <div className="grid place-items-center w-screen mt-16">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="w-2/3 space-y-6">
            <FormField
              control={form.control}
              name="verifyCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl">
                    One-Time Verification code
                  </FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription>
                    Please enter the one-time Verification code sent to your
                    Email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}

export default VerifyUserPage;
