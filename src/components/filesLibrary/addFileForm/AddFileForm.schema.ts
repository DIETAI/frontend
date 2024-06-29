import * as yup from "yup";

export const addFileSchema = yup.object({
  title: yup.string().required("form.schema.required").default(""),
  description: yup.string().default(""),
  // imageURL: yup.string().default("").required("form.schema.required"),
  file: yup.mixed().required("File is required").default(""),
});

export type IAddFileSchema = yup.InferType<typeof addFileSchema>;
