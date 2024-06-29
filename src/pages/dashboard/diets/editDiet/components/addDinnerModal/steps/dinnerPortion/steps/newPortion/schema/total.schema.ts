import { ITotal } from "interfaces/total.interfaces";
import * as yup from "yup";

export const totalSchema = {
  total: yup.object({
    kcal: yup
      .number()
      .min(0, "Wartość nie może być mniejsza od 0")
      .required("To pole jest wymagane")
      .default(0),
    protein: yup.object({
      gram: yup
        .number()
        .min(0, "Wartość nie może być mniejsza od 0")
        .required("To pole jest wymagane")
        .default(0),
      kcal: yup
        .number()
        .min(0, "Wartość nie może być mniejsza od 0")
        .required("To pole jest wymagane")
        .default(0),
    }),
    fat: yup.object({
      gram: yup
        .number()
        .min(0, "Wartość nie może być mniejsza od 0")
        .required("To pole jest wymagane")
        .default(0),
      kcal: yup
        .number()
        .min(0, "Wartość nie może być mniejsza od 0")
        .required("To pole jest wymagane")
        .default(0),
    }),
    carbohydrates: yup.object({
      gram: yup
        .number()
        .min(0, "Wartość nie może być mniejsza od 0")
        .required("To pole jest wymagane")
        .default(0),
      kcal: yup
        .number()
        .min(0, "Wartość nie może być mniejsza od 0")
        .required("To pole jest wymagane")
        .default(0),
    }),
    digestableCarbohydrates: yup.object({
      gram: yup
        .number()
        .min(0, "Wartość nie może być mniejsza od 0")
        .required("To pole jest wymagane")
        .default(0),
      kcal: yup
        .number()
        .min(0, "Wartość nie może być mniejsza od 0")
        .required("To pole jest wymagane")
        .default(0),
    }),
    fiber: yup.object({
      gram: yup
        .number()
        .min(0, "Wartość nie może być mniejsza od 0")
        .required("To pole jest wymagane")
        .default(0),
      kcal: yup
        .number()
        .min(0, "Wartość nie może być mniejsza od 0")
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
      .required("To pole jest wymagane")
      .default(0),
    proteinFatExchangers: yup
      .number()
      .min(0, "Wartość nie może być mniejsza od 0")
      .required("To pole jest wymagane")
      .default(0),

    //fattyAcids
    saturatedFattyAcids: yup
      .number()
      .typeError("To pole jest wymagane")
      .positive("Wymagana wartość większa od 0")
      .optional(), //

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

    //vitamins
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

    //minerals
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
  }),
};

export type ITotalSchema = typeof totalSchema;
