//interfaces
import { IDinnerProduct } from "../schema/dinnerProduct.schema";

export const getPortions = ({
  minAmount,
  maxAmount,
  defaultAmount,
}: Omit<IDinnerProduct, "portionsGram" | "productId">) => {
  if (minAmount > maxAmount) return [];
  if (maxAmount < minAmount) return [];

  const portionDifference = maxAmount - minAmount;

  const portions: number[] = [];

  for (
    let index = minAmount;
    index <= maxAmount;
    index = index + portionCount(portionDifference)
  ) {
    portions.push(index);
  }

  if (portions.includes(defaultAmount))
    return [...portions].sort((a, b) => a - b);

  const newPortions = [...portions, defaultAmount];
  return [...newPortions].sort((a, b) => a - b);
};

const portionCount = (portionDifference: number) => {
  if (portionDifference <= 50) {
    return 5;
  }
  if (portionDifference > 50 && portionDifference <= 150) {
    return 10;
  }
  if (portionDifference > 150 && portionDifference <= 300) {
    return 20;
  }
  if (portionDifference > 300 && portionDifference <= 500) {
    return 50;
  }

  return 75;
};
