"use server";

import { revalidatePath } from "next/cache";

import { z } from "zod";
const BASE_URL = process.env.BASE_URL;
export async function generateForm(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  const schema = z.object({
    description: z.string().min(4, { message: "Description is too short" }),
  });
  const parse = schema.safeParse({
    description: formData.get("description"),
  });
  if (!parse.success) {
    return {
      message: "Failed to parse data",
    };
  }

  if (!process.env.OPENAI_API_EY) {
    return {
      message: "API key not found",
    };
  }
  const data = parse.data;
  const promptExplanation = process.env.promptExplanation;

  try {
    const response = await fetch(`${BASE_URL}`, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
      },
      method: "POST",
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `${data.description} ${promptExplanation}`,
          },
        ],
      }),
    });
    const json = await response.json();
    revalidatePath("/");
    return {
      data: json,
      message: "Form created",
    };
  } catch (e) {
    return {
      message: "Failed to create the form",
    };
  }
}
