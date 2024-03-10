"use client";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import React from "react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
const Login = async (provider: string) => {
  try {
    const response = await signIn(provider, {
      callbackUrl: `${window.location.origin}/`,
    });
    if (response?.ok) {
      toast("Sign in successful");
    }
  } catch (error) {
    toast("something went wrong, please try again.");
  }
};
const SignInButtons = () => {
  return (
    <>
      <CardContent className="flex flex-col gap-4 justify-center ">
        <Button onClick={() => Login("google")}>
          <FaGoogle className="mr-4" size="20" />
          SignIn with Google
        </Button>
        <Button variant="secondary" onClick={() => Login("github")}>
          <FaGithub className="mr-4" size="20" />
          SignIn with GitHub
        </Button>
      </CardContent>
      <Toaster />
    </>
  );
};

export default SignInButtons;
