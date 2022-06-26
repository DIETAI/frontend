import * as yup from "yup";

export const register_schema = yup.object({
  name: yup.string().required("form.schema.required").default(""),
  lastName: yup.string().required("form.schema.required").default(""),
  email: yup
    .string()
    .email("form.schema.email")
    .required("form.schema.required")
    .default(""),
  password: yup.string().required("form.schema.required").default(""),
});

export type IRegisterSchema = yup.InferType<typeof register_schema>;
