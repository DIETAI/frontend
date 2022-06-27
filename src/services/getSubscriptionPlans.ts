import useSWR from "swr";
import axios from "utils/api";
import { ISubscriptionPlanData } from "interfaces/subscriptionPlan.interfaces";

const fetcher = (url: string, headers = {}) =>
  axios
    .get(url, {
      headers,
      withCredentials: true,
    })
    .then((res) => res.data);

export const getSubscriptionPlans = () => {
  const { data, error } = useSWR<ISubscriptionPlanData[] | null>(
    `/api/v1/subscriptionPlans`,
    fetcher
  );

  return {
    subscriptionPlans: data,
    subscriptionPlansLoading: !error && !data,
    subscriptionPlansError: error,
  };
};

export const getSubscriptionPlan = (id: string) => {
  const { data, error } = useSWR<ISubscriptionPlanData | null>(
    `/api/v1/subscriptionPlans/${id}`,
    fetcher
  );

  return {
    subscriptionPlan: data,
    subscriptionPlanLoading: !error && !data,
    subscriptionPlanError: error,
  };
};
