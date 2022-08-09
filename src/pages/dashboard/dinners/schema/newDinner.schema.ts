import * as yup from "yup";

export const basicInfoSchema = yup.object({
  name: yup.string().required("To pole jest wymagane").default(""),
  image: yup.string().default(""),
  gallery: yup.array(yup.string().required("To pole jest wymagane")),
  mealTypes: yup
    .array(
      yup
        .string()
        .oneOf(["breakfast", "second_breakfast", "lunch", "snack", "dinner"])
    )
    .default(["breakfast"])
    .min(1, "To pole jest wymagane"),
  mealTypesKind: yup
    .string()
    .oneOf(["mainCourse", "soup", "drink"])
    .default("mainCourse")
    .required("To pole jest wymagane"),
  description: yup.string().default(""),
  recipe: yup.string().default(""),
  dietKinds: yup.array(yup.string()),
  tags: yup.array(yup.string().oneOf(["nogluten", "lactose-free"])), //array(yup.string()) wegetarianski, weganski, bezmleczny, bezglutenowy wyswietlone jako checkbox
  preparation_time: yup.string().required("To pole jest wymagane"), // w zależności od czasu dodać opcje szybki, sredni, wolny
  // image: yup.mixed(),
  //rozmiar w zależności od ilości g przypisać mały, średni, duży
});

export const dinnerProductsSchema = yup.object({
  products: yup
    .array(
      yup.object({
        productId: yup.string().required("To pole jest wymagane"),
        defaultAmount: yup
          .number()
          .typeError("To pole jest wymagane")
          .positive("Wymagana wartość większa od 0")
          .required("To pole jest wymagane"),
        minAmount: yup
          .number()
          .typeError("To pole jest wymagane")
          .positive("Wymagana wartość większa od 0"),
        // .lessThan(
        //   yup.ref("max_amount"),
        //   "wartość musi być mniejsza niż maksymalna ilość"
        // ),
        maxAmount: yup
          .number()
          .typeError("To pole jest wymagane")
          .positive("Wymagana wartość większa od 0"),
        // .moreThan(
        //   yup.ref("min_amount"),
        //   "wartość musi być większa niż minimalna ilość"
        // ),
        portionsGram: yup.array(yup.number()),
      })
    )
    // .min(1)
    .default([]),
});

export const productPortionListSchema = yup.object({
  portionList: yup
    .array(
      yup.object({
        dinnerProducts: yup.array(
          yup.object({
            dinnerProductId: yup.string().required("To pole jest wymagane"),
            portion: yup
              .number()
              .typeError("To pole jest wymagane")
              .positive("Wymagana wartość większa od 0")
              .required("To pole jest wymagane"),
            total: yup.object({
              kcal: yup
                .number()
                .typeError("To pole jest wymagane")
                .positive("Wymagana wartość większa od 0")
                .required("To pole jest wymagane"),
            }),
          })
        ),
        total: yup.object({
          kcal: yup
            .number()
            .typeError("To pole jest wymagane")
            .positive("Wymagana wartość większa od 0")
            .required("To pole jest wymagane"),
        }),
        type: yup.string().oneOf(["default", "custom"]),
      })
    )
    // .min(1)
    .default([]),
});

export type IBasicInfo = yup.InferType<typeof basicInfoSchema>;
export type IDinnerProducts = yup.InferType<typeof dinnerProductsSchema>;
