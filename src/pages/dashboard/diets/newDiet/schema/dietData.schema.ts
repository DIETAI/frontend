import * as yup from "yup";

export const dietDataSchema = yup.object({
  name: yup.string().required("To pole jest wymagane").default(""),
  daysAmount: yup.number().required("To pole jest wymagane").default(7),
  dayStart: yup.date(),
  dayEnd: yup.date(),
  clientId: yup.string().required("To pole jest wymagane").default(""),
  establishmentId: yup.string().required("To pole jest wymagane").default(""),
});

export type IDietData = yup.InferType<typeof dietDataSchema>;
