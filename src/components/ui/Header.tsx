import React from "react";
import { auth, signOut } from "@/auth";
import { Button } from "./button";
import Image from "next/image";
import Link from "next/link";

const Header = async () => {
  const session = await auth();

  return (
    <header className="border bottom-1">
      <nav className="bg-white border-grey-200 px-4 py-2.5 flex flex-wrap justify-between items-center mx-auto mx-w-screen-xl">
        <div>
          <h1>AI from builder</h1>
        </div>
        {session?.user ? (
          <div className="flex items-center  justify-center gap-2">
            {session.user.image ? (
              <Image
                src={session.user.image}
                alt="user"
                width={32}
                height={32}
                className="rounded-full"
              />
            ) : (
              <span className="rounded-full">?</span>
            )}

            <SignOut />
          </div>
        ) : (
          <Link href="/api/auth/signin">
            <Button variant="link" className="h-[2rem] w-[5rem]">
              Sign In
            </Button>
          </Link>
        )}
      </nav>
    </header>
  );
};

function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button type="submit" className="h-[2rem] w-[5rem]">
        Sign Out
      </Button>
    </form>
  );
}

export default Header;
