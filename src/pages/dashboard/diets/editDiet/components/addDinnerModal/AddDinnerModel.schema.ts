import * as yup from "yup";

export const dietDinnerSchema = yup.object({
  dinnerId: yup.string().required("To pole jest wymagane"),
});

export const dietDinnerPortionSchema = yup.object({
  dietId: yup.string().required("To pole jest wymagane"),
  dayId: yup.string().required("To pole jest wymagane"),
  dietMealId: yup.string().required("To pole jest wymagane"),
  dinnerPortionId: yup.string().required("To pole jest wymagane"),
  order: yup.number().required("To pole jest wymagane"),
  // products: yup.array(
  //   yup.object({
  //     productId: yup.string().required("To pole jest wymagane"),
  //     selectedPortionGram: yup.number().required("To pole jest wymagane"),
  //     total: yup.object({
  //       kcal: yup.number(),
  //     }),
  //   })
  // ),
  // total: yup.object({
  //   kcal: yup.number(),
  // }),
});

export type IDietDinner = yup.InferType<typeof dietDinnerSchema>;
export type IDietDinnerPortion = yup.InferType<typeof dietDinnerPortionSchema>;
