"use client";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import React from "react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";

const Login = async (provider: string) => {
  await signIn(provider, {
    callbackUrl: `${window.location.origin}/`,
  });
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
