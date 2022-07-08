import React, { useEffect, useState } from "react";

import { getProduct } from "services/getProducts";

//components
import Image from "components/form/images/image/Image";

//styles
import * as Styled from "./Product.styles";

//helpers
import {
  PortionMacro,
  countMacroPortion,
} from "../../../../../../helpers/macro.helper";

interface IProductProps {
  productId: string;
  defaultAmount: number;
}

const Product = ({ productId, defaultAmount }: IProductProps) => {
  const [portionMacrohydrate, setPortionMacrohydrate] =
    useState<PortionMacro>();

  const { product, productLoading, productError } = getProduct(productId);

  useEffect(() => {
    if (product && defaultAmount) {
      const portionMacrohydrates = countMacroPortion(defaultAmount, product);
      setPortionMacrohydrate(portionMacrohydrates);
    }
  }, [defaultAmount, product]);

  if (productLoading) return <div>loading...</div>;
  if (productError) return <div>error...</div>;

  return (
    <Styled.ItemWrapper>
      {product?.image && <Image imageId={product.image} roundedSelect={true} />}

      <Styled.ItemContent>
        <h2>{product?.name}</h2>
        {product?.description && <p> {product.description}</p>}
        <h3>Makroskładniki ({defaultAmount ? defaultAmount : "100"}g):</h3>
        <Styled.ItemFeaturesWrapper>
          <Styled.ItemFeature>
            B (g): <b>{portionMacrohydrate?.portionProteinGram}</b>
          </Styled.ItemFeature>
          <Styled.ItemFeature>
            T (g): <b>{portionMacrohydrate?.portionFatGram}</b>
          </Styled.ItemFeature>
          <Styled.ItemFeature>
            W (g): <b>{portionMacrohydrate?.portionCarbohydratesGram}</b>
          </Styled.ItemFeature>
          <Styled.ItemFeature>
            Wp (g):
            <b>{portionMacrohydrate?.portionDisgestibleCarbohydratesGram}</b>
          </Styled.ItemFeature>
          <Styled.ItemFeature>
            Bł (g): <b>{portionMacrohydrate?.portionFiberGram}</b>
          </Styled.ItemFeature>
          <Styled.ItemFeature>
            Kcal: <b>{portionMacrohydrate?.portionKcal}</b>
          </Styled.ItemFeature>
        </Styled.ItemFeaturesWrapper>
        <h3>Domyślna porcja:</h3>

        <Styled.Portion

        // defaultPortion={portion === defaultAmount}
        // selectedPortion={selectedPortion === portion}
        // onClick={() => setSelectedPortion(portion)}
        >
          {defaultAmount} g
        </Styled.Portion>
      </Styled.ItemContent>
    </Styled.ItemWrapper>
  );
};

export default Product;
