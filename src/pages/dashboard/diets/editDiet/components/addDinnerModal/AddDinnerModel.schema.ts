import * as yup from "yup";

export const dietDinnerSchema = yup.object({
  dietId: yup.string().required("To pole jest wymagane").default(""),
  dayId: yup.string().required("To pole jest wymagane").default(""),
  dietMealId: yup.string().required("To pole jest wymagane").default(""),
  order: yup.number().required("To pole jest wymagane").default(1),
  dinnerId: yup.string().required("To pole jest wymagane").default(""),
});

export const dietDinnerPortionSchema = yup.object({
  dinnerPortionId: yup.string().required("To pole jest wymagane").default(""),
});

export type IDietDinner = yup.InferType<typeof dietDinnerSchema>;
export type IDietDinnerPortion = yup.InferType<typeof dietDinnerPortionSchema>;
