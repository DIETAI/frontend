import React, { ReactNode } from "react";
import { useParams } from "react-router";
import { getProduct } from "services/getProducts";
import format from "date-fns/format";
import { pl } from "date-fns/locale";

//styles
import * as Styled from "./ProductContent.styles";

//icons
import { FaUtensils, FaWeight } from "icons/icons";

//components
import Image from "components/form/images/image/Image";
import * as ProductStep from "./steps";

//interfaces
import { IProductData } from "interfaces/product.interfaces";

const ProductContent = () => {
  const { productId } = useParams();
  console.log({ productId });

  if (!productId) return <div>not found</div>;

  const { product, productError, productLoading } = getProduct(productId);

  if (productLoading) return <div>product loading</div>;
  if (!product || productError) return <div>product error</div>;

  return (
    <Styled.ProductContentWrapper>
      <ProductStep.BasicInfo
        name={product.name}
        kcal={product.kcal}
        imageURL={product.imageURL}
        gallery={product.gallery}
      />
      <ProductStep.Macrohydrates
        protein={product.protein}
        fat={product.fat}
        carbohydrates={product.carbohydrates}
        fiber={product.fiber}
        digestibleCarbohydrates={product.digestableCarbohydrates}
        carbohydrateExchangers={product.carbohydrateExchangers}
        proteinFatExchangers={product.proteinFatExchangers}
      />
      <ProductStep.Vitamins
        vitaminA={product.vitaminA}
        vitaminB1={product.vitaminB1}
        vitaminB2={product.vitaminB2}
        vitaminPP={product.vitaminPP}
        vitaminB5={product.vitaminB5}
        vitaminB6={product.vitaminB6}
        vitaminB12={product.vitaminB12}
        vitaminC={product.vitaminC}
        vitaminD={product.vitaminD}
        vitaminE={product.vitaminE}
        vitaminK={product.vitaminK}
        biotin={product.biotin}
        folicAcid={product.folicAcid}
      />
      <ProductStep.Minerals
        zinc={product.zinc}
        phosphorus={product.phosphorus}
        magnesium={product.magnesium}
        copper={product.copper}
        potassium={product.potassium}
        selenium={product.selenium}
        sodium={product.sodium}
        calcium={product.calcium}
        iron={product.iron}
      />
      <ProductStep.FattyAcids
        monounsaturatedFattyAcids={product.monounsaturatedFattyAcids}
        pollyunsaturatedFattyAcids={product.pollyunsaturatedFattyAcids}
        pollyunsaturatedFattyAcidsOmega3={
          product.pollyunsaturatedFattyAcidsOmega3
        }
        pollyunsaturatedFattyAcidsOmega6={
          product.pollyunsaturatedFattyAcidsOmega6
        }
        saturatedFattyAcids={product.saturatedFattyAcids}
      />
      <ProductStep.Measures measures={product.measures} />
      <ProductStep.Prices prices={product.prices} />
    </Styled.ProductContentWrapper>
  );
};

export default ProductContent;
