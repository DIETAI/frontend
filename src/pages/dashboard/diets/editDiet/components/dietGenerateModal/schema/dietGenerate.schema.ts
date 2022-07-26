import * as yup from "yup";

export const dietGenerateDaysSchema = yup.object({
  days: yup
    .array(yup.string().required("To pole jest wymagane"))
    .default([])
    .min(1, "Wybierz dni"),
});

export const dietGenerateMealsSchema = yup.object({
  // mealsSettingType: yup
  //   .string()
  //   .oneOf(["custom", "default"])
  //   .required("To pole jest wymagane")
  //   .default("default"),
  // meals: yup.array(yup.string()).min(1, "Wybierz posiłki"),
  generateMealsSettings: yup
    .string()
    .oneOf(["changeAmountAddedMeals", "saveAddedMeals", "newMeals"])
    .required("To pole jest wymagane")
    .default("changeAmountAddedMeals"),
  meals: yup
    .array(
      yup.object({
        uid: yup.string().required("To pole jest wymagane"),
        type: yup
          .string()
          .oneOf(["breakfast", "second_breakfast", "lunch", "snack", "dinner"]),

        // dinnerTypes: yup
        //   .array(yup.string().oneOf(["mainCourse", "soup", "drink"]))
        //   .default([]),
      })
    )
    .default([])
    .min(1, "Wybierz typy posiłków"),
  // dinnerTypes: yup
  //   .array(
  //     yup.object({
  //       mealId: yup.string().required("To pole jest wymagane"),
  //       type: yup
  //         .string()
  //         .oneOf(["mainCourse", "soup", "drink"])
  //         .required("To pole jest wymagane"),
  //     })
  //   )
  //   .default([])
  //   .min(1, "Wybierz posiłki"),
});

export const dietGeneratePreferencesSchema = yup.object({
  // preferencesSettingType: yup
  //   .string()
  //   .oneOf(["custom", "default"])
  //   .required("To pole jest wymagane")
  //   .default("default"),
  // preferencesDinners: yup.array(
  //   yup.object({
  //     dinnerId: yup.string().required("To pole jest wymagane"),
  //   })
  // ),
  // basicPreferences: yup
  //   .array(
  //     yup.object({
  //       modelType: yup
  //         .string()
  //         .oneOf([
  //           "dinner",
  //           "dinnerGroup",
  //           "product",
  //           "productGroup",
  //           "supplement",
  //         ])
  //         .required("To pole jest wymagane"),
  //       product: yup.string().required("To pole jest wymagane"), //dowolna
  //       action: yup
  //         .string()
  //         .oneOf(["exclude", "always", "often", "rarely"])
  //         .required("To pole jest wymagane"),
  //       meals: yup.array(
  //         yup
  //           .string()
  //           .oneOf([
  //             "all",
  //             "breakfast",
  //             "second_breakfast",
  //             "lunch",
  //             "snack",
  //             "dinner",
  //           ])
  //       ),
  //     })
  //   )
  //   .default([]),
  advancedPreferences: yup.object({
    cheapMeals: yup.boolean().default(false),
    quickMeals: yup.boolean().default(false),
  }),
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
