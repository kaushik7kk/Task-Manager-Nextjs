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
import { signupSchema } from "@/schemas/signupSchema";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import { useDebounceCallback } from "usehooks-ts";
import { ApiResponse } from "@/types/ApiResponse";

export default function Signup() {
  // States.
  const [username, setUsername] = useState("");
  const [uniqueUsernameMsg, setUniqueUsernameMsg] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Debounced value for username callback.
  const debounced = useDebounceCallback(setUsername, 300);

  // Setting up validation for the entire form using ZOD and usehooks.
  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fname: "",
      mname: "",
      lname: "",
      username: "",
      email: "",
      password: "",
    },
  });

  // To check the uniqueness of a username everytime it changes in the input.
  useEffect(() => {
    const checkUniqueUsername = async () => {
      if (username) {
        setIsCheckingUsername(true);
        setUniqueUsernameMsg("");
        try {
          const response = await axios.get(
            `/api/check-unique-username?username=${username}`
          );
          setUniqueUsernameMsg(response.data.message);
        } catch (err) {
          const axiosError = err as AxiosError<ApiResponse>;
          setUniqueUsernameMsg(axiosError.response?.data.message ?? "");
        } finally {
          setIsCheckingUsername(false);
        }
      } else {
        setUniqueUsernameMsg("");
      }
    };
    checkUniqueUsername();
  }, [username]);

  // Form Submission Handler.
  const onSubmitHandler = async (data: z.infer<typeof signupSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post<ApiResponse>("/api/signup", data);

    } catch(err) {
      
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
          className="w-72 mt-8 mx-auto flex flex-col align-center"
        >
          {/* Heading for the signup form. */}
          <div className="form-heading mx-auto mb-2">SIGN UP</div>
          <FormField
            control={form.control}
            name="fname"
            render={({ field }) => (
              <FormItem className="form-item">
                <FormLabel className="inp-label">First Name:</FormLabel>
                <FormControl>
                  <Input
                    className="inputs"
                    placeholder="Enter first name..."
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
            name="mname"
            render={({ field }) => (
              <FormItem className="form-item">
                <FormLabel className="inp-label">Middle Name:</FormLabel>
                <FormControl>
                  <Input
                    className="inputs"
                    placeholder="Enter middle name..."
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lname"
            render={({ field }) => (
              <FormItem className="form-item">
                <FormLabel className="inp-label">Last Name:</FormLabel>
                <FormControl>
                  <Input
                    className="inputs"
                    placeholder="Enter last name..."
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
            name="username"
            render={({ field }) => (
              <FormItem className="form-item">
                <FormLabel className="inp-label">Username:</FormLabel>
                <FormControl>
                  <Input
                    className="inputs"
                    placeholder="Enter username..."
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      debounced(e.target.value);
                    }}
                    required
                  />
                </FormControl>
                {isCheckingUsername && <Loader2 className="animate-spin" />}
                <p
                  className={`text-sm ${
                    uniqueUsernameMsg === "Valid username"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {uniqueUsernameMsg}
                </p>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="form-item">
                <FormLabel className="inp-label">Email:</FormLabel>
                <FormControl>
                  <Input
                    className="inputs"
                    placeholder="Enter email..."
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
              "Signup"
            )}
          </Button>
          <div className="sign-link w-44 mt-2 mx-auto">
            Already a user?&nbsp;
            <Link href="/login" className="text-white">
              Sign in
            </Link>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
