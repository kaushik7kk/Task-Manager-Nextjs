"use client";

import "@/styles/Signup.css";
import Topbar from "@/components/Topbar";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import { useDebounceCallback } from "usehooks-ts";
import { ApiResponse } from "@/types/ApiResponse";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { signinSchema } from "@/schemas/signinSchema";
import { getSession, signIn, useSession } from "next-auth/react";

export default function Signup() {

  // States.
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Toast.
  const { toast } = useToast();

  // Setting up validation for the entire form using ZOD and usehooks.
  const form = useForm({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  // Form Submission Handler.
  const onSubmitHandler = async (data: z.infer<typeof signinSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await signIn("credentials", {
        redirect: false,
        identifier: data.identifier,
        password: data.password,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
      const session = await getSession();
      toast({
        title: "Login successful",
        description: `Welcome ${session?.user.fname} ${session?.user.lname}`
      })
    }
  };

  return (
    <>
      <Topbar />
      {/* React Hook Form Setup */}
      <FormProvider {...form}>
        <form
          action=""
          onSubmit={form.handleSubmit(onSubmitHandler)}
          className="w-72 mt-44 mx-auto flex flex-col align-center"
        >
          {/* Heading for the signup form. */}
          <div className="form-heading mx-auto mb-2">SIGN IN</div>
          <FormField
            control={form.control}
            name="identifier"
            render={({ field }) => (
              <FormItem className="form-item">
                <FormLabel className="inp-label">Email or Username:</FormLabel>
                <FormControl>
                  <Input
                    className="inputs"
                    placeholder="Enter email or username..."
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="form-item">
                <FormLabel className="inp-label">Password:</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    className="inputs"
                    placeholder="Enter password..."
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-32 mx-auto mt-4">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
              </>
            ) : (
              "Signin"
            )}
          </Button>
          <div className="sign-link w-52 mt-2 mx-auto">
            Not registered yet?&nbsp;
            <Link href="/signup" className="text-white">
              Sign Up
            </Link>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
