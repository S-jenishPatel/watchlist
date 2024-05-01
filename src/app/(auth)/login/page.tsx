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

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FaGoogle, FaGithub } from "react-icons/fa";

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
    formState: { isSubmitting },
  } = form;

  const onSubmit = (data: z.infer<typeof loginSchema>) => {};

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
