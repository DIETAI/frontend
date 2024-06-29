import { IRegisterUserInputData } from "interfaces/user.interfaces";
import * as yup from "yup";

export const registerUserSchema: yup.ObjectSchema<IRegisterUserInputData> = yup
  .object()
  .shape({
    name: yup.string().required("form.schema.required").default(""),
    lastName: yup.string().required("form.schema.required").default(""),
    email: yup
      .string()
      .email("form.schema.email")
      .required("form.schema.required")
      .default(""),
    password: yup.string().required("form.schema.required").default(""),
  });

export const defaultRegisterUserInputData: IRegisterUserInputData =
  registerUserSchema.cast({});
