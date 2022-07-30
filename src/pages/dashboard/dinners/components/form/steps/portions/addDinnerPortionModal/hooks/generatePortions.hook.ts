import React, { useState, useEffect } from "react";
import { IDinnerProductQueryData } from "interfaces/dinner/dinnerProducts.interfaces";

//helpers
import {
  cartesianPortions,
  ICartesianResult,
} from "../helpers/cartesianGroups.helper";

interface IGeneratePortionsHook {
  dinnerProductsQuery: IDinnerProductQueryData[];
}

interface IPortionsState {
  loading: boolean;
  error: boolean;
  data?: ICartesianResult[];
}

export const GeneratePortion = ({
  dinnerProductsQuery,
}: IGeneratePortionsHook) => {
  const [portions, setPortions] = useState<IPortionsState>({
    loading: false,
    error: false,
  });

  useEffect(() => {
    if (dinnerProductsQuery) {
      console.log("generate portions");
      setPortions({ ...portions, loading: true });

      const allPortions = dinnerProductsQuery.map(({ portionsGram, _id }) =>
        portionsGram.map((portionGram) => ({
          portionGram,
          _id,
        }))
      );

      //   console.log(allPortions);

      const generatedPortions = cartesianPortions(...allPortions);

      if (!generatedPortions) {
        return setPortions({ ...portions, loading: false, error: true });
      }

      //   console.log({ cartesianPortions: portions });
      return setPortions({
        data: generatedPortions,
        loading: false,
        error: false,
      });
    }

    return;
  }, [dinnerProductsQuery]);

  return portions;
};
