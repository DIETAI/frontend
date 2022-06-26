import * as yup from "yup";

export const login_schema = yup.object({
  email: yup
    .string()
    .email("form.schema.email")
    .required("form.schema.required")
    .default(""),
  password: yup.string().required("form.schema.required").default(""),
});

export type ILoginSchema = yup.InferType<typeof login_schema>;
