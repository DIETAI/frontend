import * as yup from "yup";

export const userSubscriptionPlanSchema = yup.object({
  subscriptionPlanId: yup
    .string()
    .required("To pole jest wymagane")
    .default(""),
});

export const userSubscriptionPlanPriceSchema = yup.object({
  stripePriceId: yup.string().required("To pole jest wymagane").default(""),
});

export const userSubscriptionPlanCheckoutSchema = yup.object({
  paymentOperator: yup
    .string()
    .oneOf(["stripe", "paypal", "p24"])
    .required("To pole jest wymagane")
    .default("stripe"),
});

export type IUserSubscriptionPlan = yup.InferType<
  typeof userSubscriptionPlanSchema
>;

export type IUserSubscriptionPlanPrice = yup.InferType<
  typeof userSubscriptionPlanPriceSchema
>;

export type IUserSubscriptionPlanCheckout = yup.InferType<
  typeof userSubscriptionPlanCheckoutSchema
>;
