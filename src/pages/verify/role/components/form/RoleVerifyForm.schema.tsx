import * as yup from "yup";

export const role_verify_schema = yup.object({
  phone: yup.string().required("form.schema.required").default(""),
  roleId: yup.string().required("form.schema.required").default(""),
});

export type IRoleVerifySchema = yup.InferType<typeof role_verify_schema>;
