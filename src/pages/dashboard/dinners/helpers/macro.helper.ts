import { IProductData } from "interfaces/product.interfaces";

export const countMacroPortion = (
  portion: number,
  productObj: IProductData
) => {
  const portionProteinGram = (portion * productObj.protein.gram) / 100;
  const portionProteinKcal = portionProteinGram * 4;

  const portionFatGram = (portion * productObj.fat.gram) / 100;
  const portionFatKcal = portionFatGram * 9;

  const portionCarbohydratesGram =
    (portion * productObj.carbohydrates.gram) / 100;
  const portionCarbohydratesKcal = portionCarbohydratesGram * 4;

  const portionFiberGram = (portion * productObj.fiber.gram) / 100;

  const portionFiberKcal = portionFiberGram * 2;

  const portionDisgestibleCarbohydratesGram =
    portionCarbohydratesGram - portionFiberGram;
  const portionDisgestibleCarbohydratesKcal =
    portionDisgestibleCarbohydratesGram * 4;

  const portionKcal =
    portionProteinKcal + portionFatKcal + portionCarbohydratesKcal;

  return {
    productId: productObj._id,
    productName: productObj.name,
    portion,
    portionKcal: roundMacro(portionKcal),
    portionProteinGram: roundMacro(portionProteinGram),
    portionProteinKcal: roundMacro(portionProteinKcal),
    portionFatGram: roundMacro(portionFatGram),
    portionFatKcal: roundMacro(portionFatKcal),
    portionCarbohydratesGram: roundMacro(portionCarbohydratesGram),
    portionCarbohydratesKcal: roundMacro(portionCarbohydratesKcal),
    portionFiberGram: roundMacro(portionFiberGram),
    portionFiberKcal: roundMacro(portionFiberKcal),
    portionDisgestibleCarbohydratesGram: roundMacro(
      portionDisgestibleCarbohydratesGram
    ),
    portionDisgestibleCarbohydratesKcal: roundMacro(
      portionDisgestibleCarbohydratesKcal
    ),
  };
};

const roundMacro = (macro: number) => {
  return Math.round(macro * 1e2) / 1e2;
};

export type PortionMacro = ReturnType<typeof countMacroPortion>;
