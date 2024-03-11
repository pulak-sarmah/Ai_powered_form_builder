"use client";
import {
  Form as FormComponent,
  FormControl,
  FormItem,
  FormLabel,
  FormField as ScnFormField,
} from "@/components/ui/form";
import {
  FieldOptionSelectModel,
  FormSelectModel,
  QuestionSelectModel,
} from "@/types/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FormField from "./FormField";
import { Button } from "@/components/ui/button";
import { publishForm } from "../actions/mutateForm";
import { Toaster, toast } from "sonner";
interface Form extends FormSelectModel {
  questions: Array<
    QuestionSelectModel & {
      fieldOptions: Array<FieldOptionSelectModel>;
    }
  >;
}

type Props = {
  form: Form;
  editMode?: boolean;
};

type QuestionWithOptionsModel = QuestionSelectModel & {
  fieldOptions: Array<FieldOptionSelectModel>;
};

interface Form extends FormSelectModel {
  questions: Array<QuestionWithOptionsModel>;
}

const Form = (props: Props) => {
  const {
    form: { name, description, questions },
  } = props;

  const form = useForm();
  const router = useRouter();
  const { editMode } = props;
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDialogChange = (open: boolean) => {
    setSuccessDialogOpen(open);
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      if (editMode) {
        await publishForm(props.form.id);
      }
    } catch (error) {
      toast.error("Form submitted successfully");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="sm:text-4xl font-bold py-3 text-2xl tracking-wider">
        {name}
      </h1>
      <h3 className="text-xs sm:text-sm">{description}</h3>

      <FormComponent {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid w-full max-w-3xl items-center gap-6 my-4 text-left"
        >
          {questions.map(
            (question: QuestionWithOptionsModel, index: number) => {
              return (
                <div
                  key={`${question.text}_${index}`}
                  className="border-2 p-4 rounded-lg mt-4"
                >
                  <ScnFormField
                    control={form.control}
                    name={`question_${question.id}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base mt-3">
                          {index + 1}. {question.text}
                        </FormLabel>
                        <FormControl>
                          <FormField
                            element={question}
                            key={index}
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              );
            }
          )}
          <Button disabled={loading} type="submit">
            {loading ? "Processing..." : editMode ? "Publish" : "Submit"}
          </Button>
        </form>
      </FormComponent>
      <Toaster position="top-center" />
    </div>
  );
};

export default Form;
