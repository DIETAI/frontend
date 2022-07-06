export interface ISubscriptionPlanFeature {
  name: string;
}

export interface ISubscriptionPlanVariant {
  name: string;
  time: "1month" | "3months" | "6months";
  price: number;
  salePrice?: number;
  stripePriceId: string;
}

export interface ISubscriptionPlanData {
  _id: string;
  createdAt: string;
  updatedAt: string;
  name: "test" | "standard" | "pro" | "vip";
  role: "admin" | "patient" | "dietetic" | "personal";
  shortDescription?: string;
  description?: string;
  price: number;
  salePrice?: number;
  image: string;
  features?: ISubscriptionPlanFeature[];
  variants: ISubscriptionPlanVariant[];
}

export interface ISubscriptionPlanProps {
  subscriptionPlan: ISubscriptionPlanData;
}
