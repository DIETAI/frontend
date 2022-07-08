import * as yup from "yup";

export const dinnerPortionSchema = yup.object({
  type: yup
    .string()
    .oneOf(["custom", "default"])
    .required("To pole jest wymagane"),
  total: yup.object({
    kcal: yup
      .number()
      .typeError("To pole jest wymagane")
      .positive("Wymagana wartość większa od 0")
      .default(200),
  }),
  dinnerProducts: yup
    .array(
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
            .default(200),
        }),
      })
    )
    .default([]),
});

export type IDinnerPortion = yup.InferType<typeof dinnerPortionSchema>;
