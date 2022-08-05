import * as yup from "yup";

export const dinnerProductSchema = yup.object({
  productId: yup.string().required("To pole jest wymagane"),
  defaultAmount: yup
    .number()
    .typeError("To pole jest wymagane")
    .positive("Wymagana wartość większa od 0")
    .required("To pole jest wymagane")
    .default(100)
    .when("minAmount", {
      is: (minAmount: number) => minAmount,
      then: (schema) => schema.min(yup.ref("minAmount")),
    }),
  //     .when(
  //     ["StartIntensity", "EndIntensity"],
  //     (StartIntensity: number, EndIntensity: number, schema: any) => {
  //         return !!StartIntensity && StartIntensity !== EndIntensity
  //             ? schema.moreThan(
  //                     StartIntensity,
  //                     "Max should be > min"
  //               )
  //             : schema;
  //     }
  // ),
  minAmount: yup
    .number()
    .typeError("To pole jest wymagane")
    .positive("Wymagana wartość większa od 0")
    .default(50)
    .when("maxAmount", {
      is: (maxAmount: number) => maxAmount,
      then: (schema) =>
        schema.max(
          yup.ref("maxAmount"),
          `Minimalna ilość musi być mniejsza lub równa ${yup.ref("maxAmount")}`
        ),
    }),
  // .lessThan(
  //   yup.ref("max_amount"),
  //   "wartość musi być mniejsza niż maksymalna ilość"
  // ),
  maxAmount: yup
    .number()
    .typeError("To pole jest wymagane")
    .positive("Wymagana wartość większa od 0")
    .default(150),
  // .when("minAmount", {
  //   is: (minAmount: number) => minAmount,
  //   then: (schema) =>
  //     schema.min(
  //       yup.ref("minAmount"),
  //       `Maksymalna ilość musi być większa lub równa ${yup.ref("maxAmount")}`
  //     ),
  // }),
  // .moreThan(
  //   yup.ref("min_amount"),
  //   "wartość musi być większa niż minimalna ilość"
  // ),
  portionsGram: yup.array(yup.number().required("Wymagane")).default([]),
});

export type IDinnerProduct = yup.InferType<typeof dinnerProductSchema>;
