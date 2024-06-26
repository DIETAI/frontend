import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";

export const establishmentBasicInfoSchema = yup.object({
  name: yup.string().required("To pole jest wymagane").default(""),
  folder: yup.string().default(""),
  description: yup.string().default(""),
  dietKind: yup.string(),
  client: yup.string().required("To pole jest wymagane").default(""),
  clientMeasurementCpm: yup.boolean().default(false),
  measurementId: yup.string(),
  kcal: yup
    .number()
    .typeError("To pole jest wymagane")
    .required("To pole jest wymagane")
    .positive("Wymagana wartość większa od 0")
    .default(2000),
});

export const establishmentMealsSchema = yup.object({
  meals: yup
    .array(
      yup.object({
        _id: yup.string().required("To pole jest wymagane"),
        time: yup.string().required("To pole jest wymagane"),
        type: yup
          .string()
          .required("To pole jest wymagane")
          .oneOf([
            "breakfast",
            "second_breakfast",
            "lunch",
            "snack",
            "tea",
            "dinner",
          ]),
        name: yup.string().required("To pole jest wymagane"),
        procent: yup
          .number()
          .typeError("To pole jest wymagane")
          .positive("Wymagana wartość większa od 0")
          .required("To pole jest wymagane"),
        kcal: yup
          .number()
          .typeError("To pole jest wymagane")
          .positive("Wymagana wartość większa od 0")
          .required("To pole jest wymagane"),
      })
    )
    .default([
      {
        _id: uuidv4(),
        time: "08:00",
        type: "breakfast",
        name: "Śniadanie",
        procent: 26,
        kcal: 0,
      },
      {
        _id: uuidv4(),
        time: "11:00",
        type: "second_breakfast",
        name: "II Śniadanie",
        procent: 10,
        kcal: 0,
      },
      {
        _id: uuidv4(),
        time: "14:00",
        type: "lunch",
        name: "Obiad",
        procent: 35,
        kcal: 0,
      },
      {
        _id: uuidv4(),
        time: "18:00",
        type: "snack",
        name: "Przekąska",
        procent: 10,
        kcal: 0,
      },
      {
        _id: uuidv4(),
        time: "20:00",
        type: "dinner",
        name: "Kolacja",
        procent: 19,
        kcal: 0,
      },
    ]),
  maxMealsProcent: yup
    .number()
    .test("Niewłaściwa wartość procentowa", (value) => value === 100)
    .default(0),
});

export const establishmentMacrohydratesSchema = yup.object({
  protein: yup.object({
    gram: yup
      .number()
      .typeError("To pole jest wymagane")
      .positive("Wymagana wartość większa od 0")
      .required("To pole jest wymagane")
      .default(0),
    kcal: yup
      .number()
      .typeError("To pole jest wymagane")
      .positive("Wymagana wartość większa od 0")
      .required("To pole jest wymagane")
      .default(0),
    procent: yup
      .number()
      .typeError("To pole jest wymagane")
      .positive("Wymagana wartość większa od 0")
      .required("To pole jest wymagane")
      .default(15),
    min_procent: yup
      .number()
      .typeError("To pole jest wymagane")
      .positive("Wymagana wartość większa od 0")
      .required("To pole jest wymagane")
      .default(10)
      .lessThan(
        yup.ref("max_procent"),
        "wartość musi być mniejsza niż maksymalna ilość przedziału"
      ),
    max_procent: yup
      .number()
      .typeError("To pole jest wymagane")
      .positive("Wymagana wartość większa od 0")
      .required("To pole jest wymagane")
      .default(22)
      .moreThan(
        yup.ref("min_procent"),
        "wartość musi być większa niż minimalna ilość przedziału"
      ),
    min_gram: yup
      .number()
      .typeError("To pole jest wymagane")
      .positive("Wymagana wartość większa od 0")
      .required("To pole jest wymagane")
      .lessThan(
        yup.ref("max_gram"),
        "wartość musi być mniejsza niż maksymalna ilość przedziału"
      )
      .default(0),
    max_gram: yup
      .number()
      .typeError("To pole jest wymagane")
      .positive("Wymagana wartość większa od 0")
      .required("To pole jest wymagane")
      .moreThan(
        yup.ref("min_gram"),
        "wartość musi być większa niż minimalna ilość przedziału"
      )
      .default(0),
    min_kcal: yup
      .number()
      .typeError("To pole jest wymagane")
      .positive("Wymagana wartość większa od 0")
      .required("To pole jest wymagane")
      .lessThan(
        yup.ref("max_kcal"),
        "wartość musi być mniejsza niż maksymalna ilość przedziału"
      )
      .default(0),
    max_kcal: yup
      .number()
      .typeError("To pole jest wymagane")
      .positive("Wymagana wartość większa od 0")
      .required("To pole jest wymagane")
      .moreThan(
        yup.ref("min_kcal"),
        "wartość musi być większa niż minimalna ilość przedziału"
      )
      .default(0),
  }),
  fat: yup.object({
    gram: yup
      .number()
      .typeError("To pole jest wymagane")
      .positive("Wymagana wartość większa od 0")
      .required("To pole jest wymagane")
      .default(0),
    kcal: yup
      .number()
      .typeError("To pole jest wymagane")
      .positive("Wymagana wartość większa od 0")
      .required("To pole jest wymagane")
      .default(0),
    procent: yup
      .number()
      .typeError("To pole jest wymagane")
      .positive("Wymagana wartość większa od 0")
      .required("To pole jest wymagane")
      .default(35),
    min_procent: yup
      .number()
      .typeError("To pole jest wymagane")
      .positive("Wymagana wartość większa od 0")
      .required("To pole jest wymagane")
      .default(25)
      .lessThan(
        yup.ref("max_procent"),
        "wartość musi być mniejsza niż maksymalna ilość przedziału"
      ),
    max_procent: yup
      .number()
      .typeError("To pole jest wymagane")
      .positive("Wymagana wartość większa od 0")
      .required("To pole jest wymagane")
      .default(38)
      .moreThan(
        yup.ref("min_procent"),
        "wartość musi być większa niż minimalna ilość przedziału"
      ),
    min_gram: yup
      .number()
      .typeError("To pole jest wymagane")
      .positive("Wymagana wartość większa od 0")
      .required("To pole jest wymagane")
      .lessThan(
        yup.ref("max_gram"),
        "wartość musi być mniejsza niż maksymalna ilość przedziału"
      )
      .default(0),
    max_gram: yup
      .number()
      .typeError("To pole jest wymagane")
      .positive("Wymagana wartość większa od 0")
      .required("To pole jest wymagane")
      .moreThan(
        yup.ref("min_gram"),
        "wartość musi być większa niż minimalna ilość przedziału"
      )
      .default(0),
    min_kcal: yup
      .number()
      .typeError("To pole jest wymagane")
      .positive("Wymagana wartość większa od 0")
      .required("To pole jest wymagane")
      .lessThan(
        yup.ref("max_kcal"),
        "wartość musi być mniejsza niż maksymalna ilość przedziału"
      )
      .default(0),
    max_kcal: yup
      .number()
      .typeError("To pole jest wymagane")
      .positive("Wymagana wartość większa od 0")
      .required("To pole jest wymagane")
      .moreThan(
        yup.ref("min_kcal"),
        "wartość musi być większa niż minimalna ilość przedziału"
      )
      .default(0),
  }),
  carbohydrates: yup.object({
    gram: yup
      .number()
      .typeError("To pole jest wymagane")
      .positive("Wymagana wartość większa od 0")
      .required("To pole jest wymagane")
      .default(0),
    kcal: yup
      .number()
      .typeError("To pole jest wymagane")
      .positive("Wymagana wartość większa od 0")
      .required("To pole jest wymagane")
      .default(0),
    procent: yup
      .number()
      .typeError("To pole jest wymagane")
      .positive("Wymagana wartość większa od 0")
      .required("To pole jest wymagane")
      .default(50),
    min_procent: yup
      .number()
      .typeError("To pole jest wymagane")
      .positive("Wymagana wartość większa od 0")
      .required("To pole jest wymagane")
      .default(40)
      .lessThan(
        yup.ref("max_procent"),
        "wartość musi być mniejsza niż maksymalna ilość przedziału"
      ),
    max_procent: yup
      .number()
      .typeError("To pole jest wymagane")
      .positive("Wymagana wartość większa od 0")
      .required("To pole jest wymagane")
      .default(65)
      .moreThan(
        yup.ref("min_procent"),
        "wartość musi być większa niż minimalna ilość przedziału"
      ),
    min_gram: yup
      .number()
      .typeError("To pole jest wymagane")
      .positive("Wymagana wartość większa od 0")
      .required("To pole jest wymagane")
      .lessThan(
        yup.ref("max_gram"),
        "wartość musi być mniejsza niż maksymalna ilość przedziału"
      )
      .default(0),
    max_gram: yup
      .number()
      .typeError("To pole jest wymagane")
      .positive("Wymagana wartość większa od 0")
      .required("To pole jest wymagane")
      .moreThan(
        yup.ref("min_gram"),
        "wartość musi być większa niż minimalna ilość przedziału"
      )
      .default(0),
    min_kcal: yup
      .number()
      .typeError("To pole jest wymagane")
      .positive("Wymagana wartość większa od 0")
      .required("To pole jest wymagane")
      .lessThan(
        yup.ref("max_kcal"),
        "wartość musi być mniejsza niż maksymalna ilość przedziału"
      )
      .default(0),
    max_kcal: yup
      .number()
      .typeError("To pole jest wymagane")
      .positive("Wymagana wartość większa od 0")
      .required("To pole jest wymagane")
      .moreThan(
        yup.ref("min_kcal"),
        "wartość musi być większa niż minimalna ilość przedziału"
      )
      .default(0),
  }),
  digestableCarbohydrates: yup.object({
    gram: yup
      .number()
      .typeError("To pole jest wymagane")
      .positive("Wymagana wartość większa od 0")
      .required("To pole jest wymagane")
      .default(0),
    kcal: yup
      .number()
      .typeError("To pole jest wymagane")
      .positive("Wymagana wartość większa od 0")
      .required("To pole jest wymagane")
      .default(0),
  }),
  fiber: yup.object({
    gram: yup
      .number()
      .typeError("To pole jest wymagane")
      .positive("Wymagana wartość większa od 0")
      .required("To pole jest wymagane")
      .default(25),
    kcal: yup
      .number()
      .typeError("To pole jest wymagane")
      .positive("Wymagana wartość większa od 0")
      .required("To pole jest wymagane")
      .default(0),
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
  //   procent: yup
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
  //   procent: yup
  //     .number()
  //     .typeError("To pole jest wymagane")
  //     .positive("Wymagana wartość większa od 0")
  //     .required("To pole jest wymagane"),
  // }),
  carbohydrateExchangers: yup
    .number()
    .typeError("To pole jest wymagane")
    .positive("Wymagana wartość większa od 0")
    .required("To pole jest wymagane")
    .default(0),
  proteinFatExchangers: yup
    .number()
    .typeError("To pole jest wymagane")
    .positive("Wymagana wartość większa od 0")
    .required("To pole jest wymagane")
    .default(0),
  maxMacroProcent: yup
    .number()
    .test("Niewłaściwa wartość procentowa", (value) => value === 100)
    .default(0),
});

export const establishmentFattyAcidsSchema = yup.object({
  saturatedFattyAcids: yup
    .number()
    .typeError("To pole jest wymagane")
    .positive("Wymagana wartość większa od 0")
    .default(20),
  pollyunsaturatedFattyAcids: yup
    .number()
    .typeError("To pole jest wymagane")
    .positive("Wymagana wartość większa od 0")
    .default(20),
  pollyunsaturatedFattyAcidsOmega3: yup
    .number()
    .typeError("To pole jest wymagane")
    .positive("Wymagana wartość większa od 0")
    .default(20),
  pollyunsaturatedFattyAcidsOmega6: yup
    .number()
    .typeError("To pole jest wymagane")
    .positive("Wymagana wartość większa od 0")
    .default(20),
  monounsaturatedFattyAcids: yup
    .number()
    .typeError("To pole jest wymagane")
    .positive("Wymagana wartość większa od 0")
    .default(20),
});

export const establishmentVitaminsSchema = yup.object({
  vitaminA: yup
    .object({
      amount: yup
        .number()
        .typeError("To pole jest wymagane")
        .positive("Wymagana wartość większa od 0"),
      unit: yup
        .string()
        .required("To pole jest wymagane")
        .oneOf(["mg", "uq", "j."]),
    })
    .default({
      amount: 900,
      unit: "mg",
    }),
  vitaminB1: yup
    .object({
      amount: yup
        .number()
        .typeError("To pole jest wymagane")
        .positive("Wymagana wartość większa od 0"),
      unit: yup
        .string()
        .required("To pole jest wymagane")
        .oneOf(["mg", "uq", "j."]),
    })
    .default({
      amount: 1.3,
      unit: "mg",
    }),
  vitaminB2: yup
    .object({
      amount: yup
        .number()
        .typeError("To pole jest wymagane")
        .positive("Wymagana wartość większa od 0"),
      unit: yup
        .string()
        .required("To pole jest wymagane")
        .oneOf(["mg", "uq", "j."]),
    })
    .default({
      amount: 1.3,
      unit: "mg",
    }),
  vitaminB5: yup
    .object({
      amount: yup
        .number()
        .typeError("To pole jest wymagane")
        .positive("Wymagana wartość większa od 0"),
      unit: yup
        .string()
        .required("To pole jest wymagane")
        .oneOf(["mg", "uq", "j."]),
    })
    .default({
      amount: 5,
      unit: "mg",
    }),
  vitaminB6: yup
    .object({
      amount: yup
        .number()
        .typeError("To pole jest wymagane")
        .positive("Wymagana wartość większa od 0"),
      unit: yup
        .string()
        .required("To pole jest wymagane")
        .oneOf(["mg", "uq", "j."]),
    })
    .default({
      amount: 1.3,
      unit: "mg",
    }),
  biotin: yup
    .object({
      amount: yup
        .number()
        .typeError("To pole jest wymagane")
        .positive("Wymagana wartość większa od 0"),
      unit: yup
        .string()
        .required("To pole jest wymagane")
        .oneOf(["mg", "uq", "j."]),
    })
    .default({
      amount: 30,
      unit: "mg",
    }),
  folicAcid: yup
    .object({
      amount: yup
        .number()
        .typeError("To pole jest wymagane")
        .positive("Wymagana wartość większa od 0"),
      unit: yup
        .string()
        .required("To pole jest wymagane")
        .oneOf(["mg", "uq", "j."]),
    })
    .default({
      amount: 200,
      unit: "mg",
    }),
  vitaminB12: yup
    .object({
      amount: yup
        .number()
        .typeError("To pole jest wymagane")
        .positive("Wymagana wartość większa od 0"),
      unit: yup
        .string()
        .required("To pole jest wymagane")
        .oneOf(["mg", "uq", "j."]),
    })
    .default({
      amount: 2.4,
      unit: "mg",
    }),
  vitaminC: yup
    .object({
      amount: yup
        .number()
        .typeError("To pole jest wymagane")
        .positive("Wymagana wartość większa od 0"),
      unit: yup
        .string()
        .required("To pole jest wymagane")
        .oneOf(["mg", "uq", "j."]),
    })
    .default({
      amount: 90,
      unit: "mg",
    }),
  vitaminD: yup
    .object({
      amount: yup
        .number()
        .typeError("To pole jest wymagane")
        .positive("Wymagana wartość większa od 0"),
      unit: yup
        .string()
        .required("To pole jest wymagane")
        .oneOf(["mg", "uq", "j."]),
    })
    .default({
      amount: 15,
      unit: "mg",
    }),
  vitaminE: yup
    .object({
      amount: yup
        .number()
        .typeError("To pole jest wymagane")
        .positive("Wymagana wartość większa od 0"),
      unit: yup
        .string()
        .required("To pole jest wymagane")
        .oneOf(["mg", "uq", "j."]),
    })
    .default({
      amount: 10,
      unit: "mg",
    }),
  vitaminPP: yup
    .object({
      amount: yup
        .number()
        .typeError("To pole jest wymagane")
        .positive("Wymagana wartość większa od 0"),
      unit: yup
        .string()
        .required("To pole jest wymagane")
        .oneOf(["mg", "uq", "j."]),
    })
    .default({
      amount: 16,
      unit: "mg",
    }),
  vitaminK: yup
    .object({
      amount: yup
        .number()
        .typeError("To pole jest wymagane")
        .positive("Wymagana wartość większa od 0"),
      unit: yup
        .string()
        .required("To pole jest wymagane")
        .oneOf(["mg", "uq", "j."]),
    })
    .default({
      amount: 65,
      unit: "mg",
    }),
});

export const establishmentMineralsSchema = yup.object({
  zinc: yup
    .object({
      amount: yup
        .number()
        .typeError("To pole jest wymagane")
        .positive("Wymagana wartość większa od 0"),
      unit: yup
        .string()
        .required("To pole jest wymagane")
        .oneOf(["mg", "uq", "j."]),
    })
    .default({
      amount: 11,
      unit: "mg",
    }),
  phosphorus: yup
    .object({
      amount: yup
        .number()
        .typeError("To pole jest wymagane")
        .positive("Wymagana wartość większa od 0"),
      unit: yup
        .string()
        .required("To pole jest wymagane")
        .oneOf(["mg", "uq", "j."]),
    })
    .default({
      amount: 700,
      unit: "mg",
    }),
  magnesium: yup
    .object({
      amount: yup
        .number()
        .typeError("To pole jest wymagane")
        .positive("Wymagana wartość większa od 0"),
      unit: yup
        .string()
        .required("To pole jest wymagane")
        .oneOf(["mg", "uq", "j."]),
    })
    .default({
      amount: 400,
      unit: "mg",
    }),
  copper: yup
    .object({
      amount: yup
        .number()
        .typeError("To pole jest wymagane")
        .positive("Wymagana wartość większa od 0"),
      unit: yup
        .string()
        .required("To pole jest wymagane")
        .oneOf(["mg", "uq", "j."]),
    })
    .default({
      amount: 0.9,
      unit: "mg",
    }),
  potassium: yup
    .object({
      amount: yup
        .number()
        .typeError("To pole jest wymagane")
        .positive("Wymagana wartość większa od 0"),
      unit: yup
        .string()
        .required("To pole jest wymagane")
        .oneOf(["mg", "uq", "j."]),
    })
    .default({
      amount: 3500,
      unit: "mg",
    }),
  selenium: yup
    .object({
      amount: yup
        .number()
        .typeError("To pole jest wymagane")
        .positive("Wymagana wartość większa od 0"),
      unit: yup
        .string()
        .required("To pole jest wymagane")
        .oneOf(["mg", "uq", "j."]),
    })
    .default({
      amount: 55,
      unit: "mg",
    }),
  sodium: yup
    .object({
      amount: yup
        .number()
        .typeError("To pole jest wymagane")
        .positive("Wymagana wartość większa od 0"),
      unit: yup
        .string()
        .required("To pole jest wymagane")
        .oneOf(["mg", "uq", "j."]),
    })
    .default({
      amount: 1500,
      unit: "mg",
    }),
  calcium: yup
    .object({
      amount: yup
        .number()
        .typeError("To pole jest wymagane")
        .positive("Wymagana wartość większa od 0"),
      unit: yup
        .string()
        .required("To pole jest wymagane")
        .oneOf(["mg", "uq", "j."]),
    })
    .default({
      amount: 1200,
      unit: "mg",
    }),
  iron: yup
    .object({
      amount: yup
        .number()
        .typeError("To pole jest wymagane")
        .positive("Wymagana wartość większa od 0"),
      unit: yup
        .string()
        .required("To pole jest wymagane")
        .oneOf(["mg", "uq", "j."]),
    })
    .default({
      amount: 10,
      unit: "mg",
    }),
});

export type IEstablishmentsBasicInfo = yup.InferType<
  typeof establishmentBasicInfoSchema
>;
export type IEstablishmentsMeals = yup.InferType<
  typeof establishmentMealsSchema
>;
export type IEstablishmentsMacrohydrates = yup.InferType<
  typeof establishmentMacrohydratesSchema
>;
export type IEstablishmentsFattyAcids = yup.InferType<
  typeof establishmentFattyAcidsSchema
>;
export type IEstablishmentsVitamins = yup.InferType<
  typeof establishmentVitaminsSchema
>;
export type IEstablishmentsMinerals = yup.InferType<
  typeof establishmentMineralsSchema
>;
