import * as yup from "yup";

export const personDataSchema = yup.object({
  avatar: yup.string().default(""),
  backgroundImage: yup.string().default(""),
  logo: yup.string().default(""),
  name: yup.string().required("To pole jest wymagane").default(""),
  lastName: yup.string().required("To pole jest wymagane").default(""),
  email: yup.string().required("To pole jest wymagane").default(""),
  phone: yup.string().default(""),
  role: yup.string().default(""),
  authProvider: yup.string().default(""),
});

export type IPersonData = yup.InferType<typeof personDataSchema>;
