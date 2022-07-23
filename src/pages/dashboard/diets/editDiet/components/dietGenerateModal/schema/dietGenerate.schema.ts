import * as yup from "yup";

export const dietGenerateDaysSchema = yup.object({
  days: yup
    .array(yup.string().required("To pole jest wymagane"))
    .default([])
    .min(1, "Wybierz dni"),
});

export const dietGenerateMealsSchema = yup.object({
  mealsSettingType: yup
    .string()
    .oneOf(["custom", "default"])
    .required("To pole jest wymagane")
    .default("default"),
  meals: yup.array(yup.string()).min(1, "Wybierz posiłki"),
  mealTypes: yup
    .array(
      yup
        .string()
        .oneOf(["breakfast", "second_breakfast", "lunch", "snack", "dinner"])
    )
    .default(["breakfast", "second_breakfast", "lunch", "snack", "dinner"])
    .min(1, "Wybierz typy posiłków"),
  dinnerTypes: yup
    .array(
      yup.object({
        mealId: yup.string().required("To pole jest wymagane"),
        type: yup.string().oneOf(["mainCourse", "soup", "drink"]),
      })
    )
    .min(1, "Wybierz posiłki"),
});

export const dietGeneratePreferencesSchema = yup.object({
  preferencesSettingType: yup
    .string()
    .oneOf(["custom", "default"])
    .required("To pole jest wymagane")
    .default("default"),
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
