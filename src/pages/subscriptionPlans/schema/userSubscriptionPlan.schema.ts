import * as yup from "yup";

export const userSubscriptionPlanSchema = yup.object({
  subscriptionPlanId: yup.string().required("To pole jest wymagane"),
});

export const userSubscriptionPlanPriceSchema = yup.object({
  planTime: yup.string().required("To pole jest wymagane"),
});

export const userSubscriptionPlanCheckoutSchema = yup.object({
  dateStart: yup.date().required("To pole jest wymagane"),
  dateEnd: yup.date().required("To pole jest wymagane"),
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
