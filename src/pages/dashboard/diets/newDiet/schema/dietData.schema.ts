import * as yup from "yup";

export const dietDataSchema = yup.object({
  name: yup.string().required("To pole jest wymagane").default(""),
  daysType: yup
    .string()
    .oneOf(["amount", "date"])
    .required("To pole jest wymagane")
    .default("date"),
  daysAmount: yup.number().when("daysType", (daysType, schema) => {
    if (daysType === "amount") {
      return schema.required("To pole jest wymagane");
    }
  }),
  dayStart: yup.date().when("daysType", (daysType, schema) => {
    if (daysType === "date") {
      return schema.required("To pole jest wymagane");
    }
  }),
  dayEnd: yup.date().when("daysType", (daysType, schema) => {
    if (daysType === "date") {
      return schema.required("To pole jest wymagane");
    }
  }),
  clientId: yup.string().required("To pole jest wymagane").default(""),
  establishmentId: yup.string().required("To pole jest wymagane").default(""),
});

export type IDietData = yup.InferType<typeof dietDataSchema>;
