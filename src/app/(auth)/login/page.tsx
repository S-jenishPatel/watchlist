"use client";
import AuthCard from "@/components/authCard";
import { loginSchema } from "@/schemas/index";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Axios from "axios";

import loginUser from "@/lib/loginUser";

function LoginPage() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const {
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = form;

  const { toast } = useToast();

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    await Axios.patch("/api/login", data)
      .then(async (res) => {
        toast({ title: res.data.message });
        reset();

        await loginUser({ data });
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
    <div className="h-screen bg-primary flex justify-center items-center">
      <AuthCard
        header="Login"
        footerTitle="Don't have an Acount?"
        footerURL="/signup"
        footerText="Signup"
      >
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-2 space-y-4 w-full px-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="enter a secure password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting} className="w-full">
              Log in
            </Button>
            <p className="text-center text-slate-500">or Login with</p>
          </form>
        </Form>
      </AuthCard>
    </div>
  );
}

export default LoginPage;
