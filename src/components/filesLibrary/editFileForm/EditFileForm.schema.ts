import * as yup from "yup";

export const editFileSchema = yup.object({
  title: yup.string().required("form.schema.required").default(""),
  description: yup.string().default(""),
  file: yup.mixed().required("File is required").default(""),
});

export type IEditFileSchema = yup.InferType<typeof editFileSchema>;
