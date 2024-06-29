import * as yup from "yup";

export const subscriptionPlanSchema = yup.object({
  name: yup
    .string()
    .required("To pole jest wymagane")
    .oneOf(["test", "standard", "pro", "vip"])
    .default("standard"),
  role: yup
    .string()
    .required("To pole jest wymagane")
    .oneOf(["admin", "patient", "dietetic", "personal"])
    .default("dietetic"),
  shortDescription: yup.string().default(""),
  description: yup.string(),
  price: yup
    .number()
    .typeError("To pole jest wymagane")
    .positive("Wymagana wartość większa od 0")
    .required("To pole jest wymagane")
    .default(0),
  salePrice: yup
    .number()
    .typeError("To pole jest wymagane")
    .positive("Wymagana wartość większa od 0"),
  image: yup.string().required("To pole jest wymagane").default(""),
  features: yup.array(
    yup.object({
      name: yup.string().required("To pole jest wymagane"),
    })
  ),
  variants: yup
    .array(
      yup.object({
        name: yup.string().required("To pole jest wymagane"),
        time: yup
          .string()
          .required("To pole jest wymagane")
          .oneOf(["1month", "3months", "6months"]),
        price: yup
          .number()
          .typeError("To pole jest wymagane")
          .positive("Wymagana wartość większa od 0")
          .required("To pole jest wymagane"),
        salePrice: yup
          .number()
          .typeError("To pole jest wymagane")
          .positive("Wymagana wartość większa od 0"),
      })
    )
    .min(1),
});

export type ISubscriptionPlan = yup.InferType<typeof subscriptionPlanSchema>;
