export interface ISubscriptionPlanFeature {
  name: string;
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
}

export interface ISubscriptionPlanProps {
  subscriptionPlan: ISubscriptionPlanData;
}
