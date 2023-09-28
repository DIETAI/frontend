import * as yup from "yup";

export const personDataSchema = yup.object({
  name: yup.string().required("To pole jest wymagane").default(""),
  lastName: yup.string().required("To pole jest wymagane").default(""),
  email: yup.string().required("To pole jest wymagane").default(""),
  avatar: yup.string().default(""),
});

export type IPersonData = yup.InferType<typeof personDataSchema>;
