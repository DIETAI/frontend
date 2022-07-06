import * as yup from "yup";

export const dinnerProductSchema = yup.object({
  productId: yup.string().required("To pole jest wymagane"),
  defaultAmount: yup
    .number()
    .typeError("To pole jest wymagane")
    .positive("Wymagana wartość większa od 0")
    .required("To pole jest wymagane")
    .default(100),
  minAmount: yup
    .number()
    .typeError("To pole jest wymagane")
    .positive("Wymagana wartość większa od 0")
    .default(50),
  // .lessThan(
  //   yup.ref("max_amount"),
  //   "wartość musi być mniejsza niż maksymalna ilość"
  // ),
  maxAmount: yup
    .number()
    .typeError("To pole jest wymagane")
    .positive("Wymagana wartość większa od 0")
    .default(150),
  // .moreThan(
  //   yup.ref("min_amount"),
  //   "wartość musi być większa niż minimalna ilość"
  // ),
  portionsGram: yup.array(yup.number().required("Wymagane")).default([]),
});

export type IDinnerProduct = yup.InferType<typeof dinnerProductSchema>;
