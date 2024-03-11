import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { forms } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import React from "react";
import Link from "next/link";
type Form = InferSelectModel<typeof forms>;

type Props = {
  forms: Form[];
};
const FormsList = (props: Props) => {
  return (
    <div className="grid grid-cols1 md:grid-cols-3 m-5 p-4 gap-4">
      {props.forms.map((form) => (
        <Card key={form.id} className="max-w-[350px]">
          <CardHeader>
            <CardTitle> {form.name}</CardTitle>
            <CardDescription>{form.description}</CardDescription>
          </CardHeader>
          <CardFooter>
            <Link className="w-full" href={`/forms/edit/${form.id}`}>
              <Button className="w-full">View</Button>
            </Link>
          </CardFooter>
          {form.name}
        </Card>
      ))}
    </div>
  );
};

export default FormsList;
