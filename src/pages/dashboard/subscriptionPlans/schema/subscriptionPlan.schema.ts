import * as yup from "yup";

export const subscriptionPlanSchema = yup.object({
  name: yup
    .string()
    .required("To pole jest wymagane")
    .oneOf(["test", "standard", "pro", "vip"]),
  role: yup
    .string()
    .required("To pole jest wymagane")
    .oneOf(["admin", "patient", "dietetic", "personal"]),
  shortDescription: yup.string().default(""),
  description: yup.string().default(""),
  price: yup
    .number()
    .typeError("To pole jest wymagane")
    .positive("Wymagana wartość większa od 0")
    .required("To pole jest wymagane"),
  salePrice: yup
    .number()
    .typeError("To pole jest wymagane")
    .positive("Wymagana wartość większa od 0"),
  image: yup.string().required("To pole jest wymagane"),
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
    .min(1)
    .required("Wymagana wartość większa od 0"),
});

export type ISubscriptionPlan = yup.InferType<typeof subscriptionPlanSchema>;
