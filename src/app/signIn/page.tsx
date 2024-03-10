import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import SignInButtons from "./SignInButtons";

const signin = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="bg-foreground min-h-screen col-span-4 hidden sm:flex justify-center items-center">
        <span className="text-background text-2xl md:text-4xl font-bold">
          <Link href="/" className=" tracking-wide">
            IntelliForms
          </Link>
        </span>
      </div>
      <div className="flex justify-center min-h-screen col-span-12 sm:col-span-8 ">
        <Card className="sm:w-1/2 m-auto  sm:h-[35%] w-full h-full ">
          <CardHeader className="mt-8 sm:mt-0">
            <CardTitle>Sign In</CardTitle>
            <CardDescription className="text-xs">
              Unlock Efficiency with IntelliForms: Your Smart Form Solution
            </CardDescription>
          </CardHeader>
          <SignInButtons />
        </Card>
      </div>
    </div>
  );
};

export default signin;
