"use server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { saveForm } from "./mutateForm";

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

  if (!process.env.OPENAI_API_KEY) {
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
    const res = JSON.parse(json.choices[0].message.content);

    if (!res.name || !res.description || !res.questions) {
      return {
        message: "Failed to generate the form",
      };
    }

    const dbFormId = await saveForm({
      name: res.name,
      description: res.description,
      questions: res.questions,
    });

    revalidatePath("/");
    return {
      data: { formId: dbFormId },
      message: "Form created",
    };
  } catch (e) {
    return {
      message: "Failed to create the form",
    };
  }
}
