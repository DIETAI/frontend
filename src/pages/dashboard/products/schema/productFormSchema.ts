import * as yup from "yup";

const season = [
  { id: 1, name: "zima" },
  { id: 2, name: "wiosna" },
  { id: 3, name: "lato" },
  { id: 4, name: "jesień" },
];

export const product_basic_info_schema = yup.object().shape({
  name: yup.string().required("To pole jest wymagane").default(""),
  description: yup.string().default(""),
  subGroupId: yup.string(),
  measureUnit: yup
    .string()
    .oneOf(["g", "l"])
    .required("To pole jest wymagane")
    .default("g"), //litr, gram
  dietKindsExclude: yup.array(yup.string().required()).default([]),
  season: yup.string().oneOf(["zima", "wiosna", "lato", "jesień"]),
  image: yup.string(),
  gallery: yup.array(yup.string().required("To pole jest wymagane")),
  tags: yup.array(yup.string().oneOf(["nogluten", "lactose-free"])).default([]), //array(yup.string()) wegetarianski, weganski, bezmleczny, bezglutenowy wyswietlone jako checkbox
  //grupa | dodaj grupę
  //folder
});

export const product_macrohydrates_schema = yup.object().shape({
  protein: yup
    .object({
      gram: yup
        .number()
        .min(0, "Wartość nie może być mniejsza od 0")
        .required("To pole jest wymagane"),
      kcal: yup
        .number()
        .min(0, "Wartość nie może być mniejsza od 0")
        .required("To pole jest wymagane"),
    })
    .default({
      gram: 2,
    }),

  fat: yup.object({
    gram: yup
      .number()
      .min(0, "Wartość nie może być mniejsza od 0")
      .required("To pole jest wymagane"),
    kcal: yup
      .number()
      .min(0, "Wartość nie może być mniejsza od 0")
      .required("To pole jest wymagane"),
  }),
  carbohydrates: yup.object({
    gram: yup
      .number()
      .min(0, "Wartość nie może być mniejsza od 0")
      .required("To pole jest wymagane"),
    kcal: yup
      .number()
      .min(0, "Wartość nie może być mniejsza od 0")
      .required("To pole jest wymagane"),
  }),
  digestableCarbohydrates: yup.object({
    gram: yup
      .number()
      .min(0, "Wartość nie może być mniejsza od 0")
      .required("To pole jest wymagane"),
    kcal: yup
      .number()
      .min(0, "Wartość nie może być mniejsza od 0")
      .required("To pole jest wymagane"),
  }),
  fiber: yup.object({
    gram: yup
      .number()
      .min(0, "Wartość nie może być mniejsza od 0")
      .required("To pole jest wymagane"),
    kcal: yup
      .number()
      .min(0, "Wartość nie może być mniejsza od 0")
      .required("To pole jest wymagane"),
  }),
  // animalProtein: yup.object({
  //   gram: yup
  //     .number()
  //     .typeError("To pole jest wymagane")
  //     .positive("Wymagana wartość większa od 0")
  //     .required("To pole jest wymagane"),
  //   kcal: yup
  //     .number()
  //     .typeError("To pole jest wymagane")
  //     .positive("Wymagana wartość większa od 0")
  //     .required("To pole jest wymagane"),
  // }),
  // vegetableProtein: yup.object({
  //   gram: yup
  //     .number()
  //     .typeError("To pole jest wymagane")
  //     .positive("Wymagana wartość większa od 0")
  //     .required("To pole jest wymagane"),
  //   kcal: yup
  //     .number()
  //     .typeError("To pole jest wymagane")
  //     .positive("Wymagana wartość większa od 0")
  //     .required("To pole jest wymagane"),
  // }),
  carbohydrateExchangers: yup
    .number()
    .min(0, "Wartość nie może być mniejsza od 0")
    .required("To pole jest wymagane"),
  proteinFatExchangers: yup
    .number()
    .min(0, "Wartość nie może być mniejsza od 0")
    .required("To pole jest wymagane"),
  kcal: yup
    .number()
    .min(0, "Wartość nie może być mniejsza od 0")
    .required("To pole jest wymagane"),
});

export const product_fatty_acids_schema = yup.object().shape({
  saturatedFattyAcids: yup
    .number()
    .typeError("To pole jest wymagane")
    .positive("Wymagana wartość większa od 0"),
  pollyunsaturatedFattyAcids: yup
    .number()
    .typeError("To pole jest wymagane")
    .positive("Wymagana wartość większa od 0"),
  pollyunsaturatedFattyAcidsOmega3: yup
    .number()
    .typeError("To pole jest wymagane")
    .positive("Wymagana wartość większa od 0"),
  pollyunsaturatedFattyAcidsOmega6: yup
    .number()
    .typeError("To pole jest wymagane")
    .positive("Wymagana wartość większa od 0"),
  monounsaturatedFattyAcids: yup
    .number()
    .typeError("To pole jest wymagane")
    .positive("Wymagana wartość większa od 0"),
});

export const product_vitamins_schema = yup.object().shape({
  vitaminA: yup.object({
    amount: yup
      .number()
      .typeError("To pole jest wymagane")
      .positive("Wymagana wartość większa od 0"),
    unit: yup.string().oneOf(["mg", "uq", "j."]),
  }),
  // .default({
  //   unit: "mg",
  // }),
  vitaminB1: yup.object({
    amount: yup
      .number()
      .typeError("To pole jest wymagane")
      .positive("Wymagana wartość większa od 0"),
    unit: yup.string().oneOf(["mg", "uq", "j."]),
  }),
  // .default({
  //   unit: "mg",
  // }),
  vitaminB2: yup.object({
    amount: yup
      .number()
      .typeError("To pole jest wymagane")
      .positive("Wymagana wartość większa od 0"),
    unit: yup.string().oneOf(["mg", "uq", "j."]),
  }),
  // .default({
  //   unit: "mg",
  // }),
  vitaminB5: yup.object({
    amount: yup
      .number()
      .typeError("To pole jest wymagane")
      .positive("Wymagana wartość większa od 0"),
    unit: yup.string().oneOf(["mg", "uq", "j."]),
  }),
  // .default({
  //   unit: "mg",
  // }),
  vitaminB6: yup.object({
    amount: yup
      .number()
      .typeError("To pole jest wymagane")
      .positive("Wymagana wartość większa od 0"),
    unit: yup.string().oneOf(["mg", "uq", "j."]),
  }),
  // .default({
  //   unit: "mg",
  // }),
  biotin: yup.object({
    amount: yup
      .number()
      .typeError("To pole jest wymagane")
      .positive("Wymagana wartość większa od 0"),
    unit: yup.string().oneOf(["mg", "uq", "j."]),
  }),
  // .default({
  //   unit: "mg",
  // }),
  folicAcid: yup.object({
    amount: yup
      .number()
      .typeError("To pole jest wymagane")
      .positive("Wymagana wartość większa od 0"),
    unit: yup.string().oneOf(["mg", "uq", "j."]),
  }),
  // .default({
  //   unit: "mg",
  // }),
  vitaminB12: yup.object({
    amount: yup
      .number()
      .typeError("To pole jest wymagane")
      .positive("Wymagana wartość większa od 0"),
    unit: yup.string().oneOf(["mg", "uq", "j."]),
  }),
  // .default({
  //   unit: "mg",
  // }),
  vitaminC: yup.object({
    amount: yup
      .number()
      .typeError("To pole jest wymagane")
      .positive("Wymagana wartość większa od 0"),
    unit: yup.string().oneOf(["mg", "uq", "j."]),
  }),
  // .default({
  //   unit: "mg",
  // }),
  vitaminD: yup.object({
    amount: yup
      .number()
      .typeError("To pole jest wymagane")
      .positive("Wymagana wartość większa od 0"),
    unit: yup.string().oneOf(["mg", "uq", "j."]),
  }),
  // .default({
  //   unit: "mg",
  // }),
  vitaminE: yup.object({
    amount: yup
      .number()
      .typeError("To pole jest wymagane")
      .positive("Wymagana wartość większa od 0"),
    unit: yup.string().oneOf(["mg", "uq", "j."]),
  }),
  // .default({
  //   unit: "mg",
  // }),

  vitaminPP: yup.object({
    amount: yup
      .number()
      .typeError("To pole jest wymagane")
      .positive("Wymagana wartość większa od 0"),
    unit: yup.string().oneOf(["mg", "uq", "j."]),
  }),
  // .default({
  //   unit: "mg",
  // }),

  vitaminK: yup.object({
    amount: yup
      .number()
      .typeError("To pole jest wymagane")
      .positive("Wymagana wartość większa od 0"),
    unit: yup.string().oneOf(["mg", "uq", "j."]),
  }),
  // .default({
  //   unit: "mg",
  // }),
});

export const product_minerals_schema = yup.object().shape({
  zinc: yup.object({
    amount: yup
      .number()
      .typeError("To pole jest wymagane")
      .positive("Wymagana wartość większa od 0"),
    unit: yup.string().oneOf(["mg", "uq", "j."]),
  }),
  // .default({
  //   unit: "mg",
  // }),
  phosphorus: yup.object({
    amount: yup
      .number()
      .typeError("To pole jest wymagane")
      .positive("Wymagana wartość większa od 0"),
    unit: yup.string().oneOf(["mg", "uq", "j."]),
  }),
  // .default({
  //   unit: "mg",
  // }),
  magnesium: yup.object({
    amount: yup
      .number()
      .typeError("To pole jest wymagane")
      .positive("Wymagana wartość większa od 0"),
    unit: yup.string().oneOf(["mg", "uq", "j."]),
  }),
  // .default({
  //   unit: "mg",
  // }),
  copper: yup.object({
    amount: yup
      .number()
      .typeError("To pole jest wymagane")
      .positive("Wymagana wartość większa od 0"),
    unit: yup.string().oneOf(["mg", "uq", "j."]),
  }),
  // .default({
  //   unit: "mg",
  // }),
  potassium: yup.object({
    amount: yup
      .number()
      .typeError("To pole jest wymagane")
      .positive("Wymagana wartość większa od 0"),
    unit: yup.string().oneOf(["mg", "uq", "j."]),
  }),
  // .default({
  //   unit: "mg",
  // }),
  selenium: yup.object({
    amount: yup
      .number()
      .typeError("To pole jest wymagane")
      .positive("Wymagana wartość większa od 0"),
    unit: yup.string().oneOf(["mg", "uq", "j."]),
  }),
  // .default({
  //   unit: "mg",
  // }),
  sodium: yup.object({
    amount: yup
      .number()
      .typeError("To pole jest wymagane")
      .positive("Wymagana wartość większa od 0"),
    unit: yup.string().oneOf(["mg", "uq", "j."]),
  }),
  // .default({
  //   unit: "mg",
  // }),
  calcium: yup.object({
    amount: yup
      .number()
      .typeError("To pole jest wymagane")
      .positive("Wymagana wartość większa od 0"),
    unit: yup.string().oneOf(["mg", "uq", "j."]),
  }),
  // .default({
  //   unit: "mg",
  // }),
  iron: yup.object({
    amount: yup
      .number()
      .typeError("To pole jest wymagane")
      .positive("Wymagana wartość większa od 0"),
    unit: yup.string().oneOf(["mg", "uq", "j."]),
  }),
  // .default({
  //   unit: "mg",
  // }),
});

const measureColumn = ["miara", "jednostka", "gram", ""];

// const priceAverageHelper = (prices: []) => {
//   const sum = prices.reduce((a, b) => a + b, 0);
//   const avg = sum / prices.length || 0;

//   return avg;
// };

export const product_measures_schema = yup.object({
  measures: yup
    .array(
      yup.object({
        type: yup
          .string()
          .oneOf([
            "porcja",
            "sztuka",
            "szklanka",
            "łyżka",
            "łyżeczka",
            "garść",
            "opakowanie",
            "plaster",
            "ząbek",
            "kostka",
          ])
          .required("To pole jest wymagane"),
        amount: yup
          .number()
          .typeError("To pole jest wymagane")
          .positive("Wymagana wartość większa od 0")
          .required("To pole jest wymagane"),
        unit: yup.string().oneOf(["g", "ml"]),
      })
    )

    .default([]),
});

export const product_prices_schema = yup.object({
  prices: yup.array(
    yup.object({
      shop: yup.string().required("To pole jest wymagane"),
      price: yup
        .number()
        .typeError("To pole jest wymagane")
        .positive("Wymagana wartość większa od 0")
        .required("To pole jest wymagane"),
      currency: yup
        .string()
        .oneOf(["PLN", "USD", "EUR"])
        .required("To pole jest wymagane"),
    })
  ),
});
export const product_tags_schema = yup.object({
  tags: yup.array(yup.string()), //wegetarianski, weganski, bezmleczny, bezglutenowy
});

export type IProductBasicInfo = yup.InferType<typeof product_basic_info_schema>;
export type IProductMacrohydrates = yup.InferType<
  typeof product_macrohydrates_schema
>;
export type IProductFattyAcids = yup.InferType<
  typeof product_fatty_acids_schema
>;
export type IProductVitamins = yup.InferType<typeof product_vitamins_schema>;
export type IProductMinerals = yup.InferType<typeof product_minerals_schema>;
export type IProductMeasures = yup.InferType<typeof product_measures_schema>;
export type IProductPrices = yup.InferType<typeof product_prices_schema>;
