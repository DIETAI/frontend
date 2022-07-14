import * as yup from "yup";

export const dietGenerateDaysSchema = yup.object({
  days: yup
    .array(yup.string().required("To pole jest wymagane"))
    .min(1, "Wybierz dni"),
});

export const dietGenerateMealsSchema = yup.object({
  meals: yup
    .array(
      yup.object({
        dayId: yup.string().required("To pole jest wymagane"),
        mealId: yup.string().required("To pole jest wymagane"),
      })
    )
    .min(1, "Wybierz posiłki"),
  dinnersEstablishment: yup
    .array(
      yup.object({
        mealId: yup.string().required("To pole jest wymagane"),
        type: yup.string().oneOf(["mainCourse", "soup", "drink"]),
      })
    )
    .min(1, "Wybierz posiłki"),
});

export const dietGeneratePreferencesSchema = yup.object({
  preferencesDinners: yup.array(
    yup.object({
      dinnerId: yup.string().required("To pole jest wymagane"),
    })
  ),
});

export type IDietGenerateDaysSchema = yup.InferType<
  typeof dietGenerateDaysSchema
>;
export type IDietGenerateMealsSchema = yup.InferType<
  typeof dietGenerateMealsSchema
>;
export type IDietGeneratePreferencesSchema = yup.InferType<
  typeof dietGeneratePreferencesSchema
>;
