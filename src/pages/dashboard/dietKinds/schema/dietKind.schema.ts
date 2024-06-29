import * as yup from "yup";

export const dietKindSchema = yup.object({
  name: yup.string().required("To pole jest wymagane").default(""),
  type: yup
    .string()
    .required("To pole jest wymagane")
    .oneOf(["healing", "unconventional", "other"])
    .default("healing"),
  description: yup.string(),
});

export type IDietKind = yup.InferType<typeof dietKindSchema>;
