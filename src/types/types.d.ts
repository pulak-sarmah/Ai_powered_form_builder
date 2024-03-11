import { InferSelectModel } from "drizzle-orm";
import { Forms, questions, fieldOptions } from "@/db/schema";

export type FormSelectModel = InferSelectModel<typeof Forms>;
export type QuestionSelectModel = InferSelectModel<typeof questions>;
export type FieldOptionSelectModel = InferSelectModel<typeof fieldOptions>;
