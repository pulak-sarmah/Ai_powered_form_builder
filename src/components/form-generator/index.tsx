"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { generateForm } from "@/actions/generateForm";
import { useFormState, useFormStatus } from "react-dom";
import { Toaster } from "../ui/sonner";
import { toast } from "sonner";

import { useSession, signIn } from "next-auth/react";
type Props = {};

const initialState: {
  message: string;
  data?: any;
} = {
  message: "",
};

const FormGenerator = (props: Props) => {
  const [state, formAction] = useFormState(generateForm, initialState);
  const [open, setOpen] = useState(false);

  const session = useSession();

  const onFormCreate = () => {
    if (session.data?.user) {
      setOpen(true);
    } else {
      signIn();
    }
  };

  useEffect(() => {
    if (state.message === "Form created") {
      setOpen(false);
    }
    if (state.message !== "" && state.message !== "Form created") {
      toast("something went wrong, please try again.");
    }
  }, [state.message]);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <Button onClick={onFormCreate}>Create Form</Button>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Form</DialogTitle>
          </DialogHeader>
          <form action={formAction}>
            <div className="grid gap-4 py-4">
              <Textarea
                id="description"
                name="description"
                required
                placeholder="Share what your form is about, who is it for, and what information you would like to collect. And AI will generate the form for you.🪄"
              />
            </div>

            <DialogFooter>
              <SubmitButton />
              <Button variant="link">Create Manual Form Instead</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <Toaster position="top-center" />
    </>
  );
};

export function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Generating..." : "Generate Form 🪄"}
    </Button>
  );
}

export default FormGenerator;
