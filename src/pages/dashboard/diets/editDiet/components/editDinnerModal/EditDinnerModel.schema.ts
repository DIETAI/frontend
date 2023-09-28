import * as yup from "yup";

export const dietDinnerSchema = yup.object({
  dietId: yup.string().required("To pole jest wymagane"),
  dayId: yup.string().required("To pole jest wymagane"),
  dietMealId: yup.string().required("To pole jest wymagane"),
  order: yup.number().required("To pole jest wymagane"),
  dinnerId: yup.string().required("To pole jest wymagane"),
});

export const dietDinnerPortionSchema = yup.object({
  dinnerPortionId: yup.string().required("To pole jest wymagane"),
});

export type IDietDinner = yup.InferType<typeof dietDinnerSchema>;
export type IDietDinnerPortion = yup.InferType<typeof dietDinnerPortionSchema>;
