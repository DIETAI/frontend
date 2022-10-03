import * as yup from "yup";

export const dietKindSchema = yup.object({
  name: yup.string().required("To pole jest wymagane"),
  type: yup
    .string()
    .required("To pole jest wymagane")
    .oneOf(["healing", "unconventional", "other"]),
  description: yup.string(),
});

export type IDietKind = yup.InferType<typeof dietKindSchema>;
