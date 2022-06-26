import * as yup from "yup";

export const personDataSchema = yup.object({
  avatar: yup.string().default(""),
  backgroundImage: yup.string().default(""),
  logo: yup.string().default(""),
  name: yup.string().required("To pole jest wymagane").default(""),
  lastName: yup.string().required("To pole jest wymagane").default(""),
  email: yup.string().required("To pole jest wymagane").default(""),
  phone: yup.string().required("To pole jest wymagane").default(""),
  role: yup.string().required("To pole jest wymagane").default(""),
  authProvider: yup.string().required("To pole jest wymagane").default(""),
});

export type IPersonData = yup.InferType<typeof personDataSchema>;
