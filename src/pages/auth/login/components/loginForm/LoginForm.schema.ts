import * as yup from "yup";
import { ILoginUserInputData } from "interfaces/user.interfaces";

export const loginUserSchema: yup.ObjectSchema<ILoginUserInputData> = yup
  .object()
  .shape({
    email: yup
      .string()
      .email("form.schema.email")
      .required("form.schema.required")
      .default(""),
    password: yup.string().required("form.schema.required").default(""),
  });

export const defaultLoginUserInputData: ILoginUserInputData =
  loginUserSchema.cast({});
