import React, { ReactNode, useEffect, useState } from "react";
import { useParams } from "react-router";
import { getProduct } from "services/getProducts";
import format from "date-fns/format";
import { pl } from "date-fns/locale";

//styles
import * as Styled from "./ProductContent.styles";

//icons
import { FaUtensils, FaWeight, FaExclamationCircle } from "icons/icons";

//components
import Image from "components/form/images/image/Image";
import * as ProductStep from "./steps";
import LoadingGrid from "../loading/LoadingGrid";

//interfaces
import { IProductData } from "interfaces/product.interfaces";
import { AnimatePresence } from "framer-motion";

const ProductContent = () => {
  // const loadingSteps = Array(7).fill("");
  const { productId } = useParams();
  console.log({ productId });

  if (!productId) return <div>not found</div>;

  const { product, productError, productLoading } = getProduct(productId);

  // if (productLoading) {
  //   return (
  //     <Styled.ProductContentWrapper>
  //       <AnimatePresence>
  //         <Styled.ProductLoadingStepsWrapper
  //           initial={{ opacity: 0.7 }}
  //           animate={{ opacity: 1 }}
  //           exit={{ opacity: 0 }}
  //           transition={{ duration: 1 }}
  //         >
  //           {loadingSteps.map((_, index) => (
  //             <LoadingGrid key={index + 1} />
  //           ))}
  //         </Styled.ProductLoadingStepsWrapper>
  //       </AnimatePresence>
  //     </Styled.ProductContentWrapper>
  //   );
  // }

  //return modal when product error
  if (productError)
    return (
      <div>
        <FaExclamationCircle />
        <h3>Wystąpił błąd podczas pobierania danych produktu</h3>
        <p>spróbuj ponownie pobrać dane</p>
      </div>
    );

  return (
    <Styled.ProductContentWrapper>
      {/* <AnimatePresence>
        {productLoading && (
          <Styled.ProductLoadingStepsWrapper
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {loadingSteps.map((_, index) => (
              <LoadingGrid key={index + 1} />
            ))}
          </Styled.ProductLoadingStepsWrapper>
        )}
      </AnimatePresence> */}

      <ProductStep.BasicInfo
      // name={product.name}
      // imageURL={product.imageURL}
      // gallery={product.gallery}
      // kcal={product.kcal}
      // protein={product.protein}
      // fat={product.fat}
      // carbohydrates={product.carbohydrates}
      // fiber={product.fiber}
      />
      <ProductStep.Macrohydrates
      // protein={product.protein}
      // fat={product.fat}
      // carbohydrates={product.carbohydrates}
      // fiber={product.fiber}
      // digestibleCarbohydrates={product.digestableCarbohydrates}
      // carbohydrateExchangers={product.carbohydrateExchangers}
      // proteinFatExchangers={product.proteinFatExchangers}
      />
      <ProductStep.Vitamins
      // vitaminA={product.vitaminA}
      // vitaminB1={product.vitaminB1}
      // vitaminB2={product.vitaminB2}
      // vitaminPP={product.vitaminPP}
      // vitaminB5={product.vitaminB5}
      // vitaminB6={product.vitaminB6}
      // vitaminB12={product.vitaminB12}
      // vitaminC={product.vitaminC}
      // vitaminD={product.vitaminD}
      // vitaminE={product.vitaminE}
      // vitaminK={product.vitaminK}
      // biotin={product.biotin}
      // folicAcid={product.folicAcid}
      />
      <ProductStep.Minerals
      // zinc={product.zinc}
      // phosphorus={product.phosphorus}
      // magnesium={product.magnesium}
      // copper={product.copper}
      // potassium={product.potassium}
      // selenium={product.selenium}
      // sodium={product.sodium}
      // calcium={product.calcium}
      // iron={product.iron}
      />
      <ProductStep.FattyAcids
      // monounsaturatedFattyAcids={product.monounsaturatedFattyAcids}
      // pollyunsaturatedFattyAcids={product.pollyunsaturatedFattyAcids}
      // pollyunsaturatedFattyAcidsOmega3={
      //   product.pollyunsaturatedFattyAcidsOmega3
      // }
      // pollyunsaturatedFattyAcidsOmega6={
      //   product.pollyunsaturatedFattyAcidsOmega6
      // }
      // saturatedFattyAcids={product.saturatedFattyAcids}
      />
      <ProductStep.Measures
      //  measures={product.measures}
      />
      <ProductStep.Prices
      //  prices={product.prices}
      />
    </Styled.ProductContentWrapper>
  );
};

export default ProductContent;
