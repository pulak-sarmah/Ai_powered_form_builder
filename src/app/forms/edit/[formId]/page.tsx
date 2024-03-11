import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/auth";
import { forms } from "@/db/schema";
import { eq } from "drizzle-orm";
import { db } from "@/db/connectDb";
import { TbBrandAuth0 } from "react-icons/tb";
import Form from "@/app/forms/Form";

type Props = {
  params: {
    formId: string;
  };
};

const page = async ({ params }: Props) => {
  const session = await auth();
  const userId = session?.user?.id;

  const form = await db.query.forms.findFirst({
    where: eq(forms.id, Number(params.formId)),
    with: {
      questions: {
        with: {
          fieldOptions: true,
        },
      },
    },
  });

  if (userId !== form?.userId) {
    return (
      <Card className="flex min-h-screen items-center justify-center container flex-col">
        <CardHeader>
          <TbBrandAuth0 size={100} />
        </CardHeader>
        <CardTitle className="text-xl sm:text-4xl">
          You are not authorized to visit this page
        </CardTitle>
      </Card>
    );
  }

  if (!form) {
    return;
  }

  return <Form form={form} editMode={true} />;
};

export default page;
