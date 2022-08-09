import React, { useState, useEffect } from "react";

//styles
import * as Styled from "../ProductSelectPopup.styles";

//components
import Image from "components/form/images/image/Image";
import { IProductData } from "interfaces/product.interfaces";

interface IRecommendedProductsProps {
  selectProduct: (productId: string) => void;
  //   searchValue: string;
}

//   useEffect(() => {
//     if (addedProducts.length > 0) {
//       const getRecommendProducts = async () => {
//         const dinnerProductsToRecommend = addedProducts.map(({ product }) => ({
//           id: "dinnerProduct1Id",
//           "dinner.id": "dinner1ID",
//           "dinner.name": mealName,
//           "product.id": product,
//           "product.name": products.filter(({ id }) => id === product)[0].name, // "Płatki owsiane", //filter by id
//           "dinner.mealType.name": data?.mealTypes.filter(
//             (mealType) => mealType.id === mealTypeId
//           )[0].name, // "Śniadanie",
//           minAmount: 0,
//           maxAmount: 0,
//         }));
//         try {
//           setRecommendProductsLoading(true);
//           const recommend_products = await axios.post(
//             recommendProductsUrl,
//             dinnerProductsToRecommend
//           );
//           //dodać cors
//           console.log(recommend_products.data);

//           setRecommendProducts(recommend_products.data as IRecommendProduct[]);
//           setRecommendProductsLoading(false);
//         } catch (e) {
//           console.log(e);
//         }
//       };

//       return getRecommendProducts();
//     }
//     return;
//   }, [addedProducts.length]);

const RecommendedProducts = ({ selectProduct }: IRecommendedProductsProps) => {
  const recommendedProducts: IProductData[] = [];

  //   useEffect(() => {
  //     const recommendedProducts = getRecommendedProducts();
  //   }, []);

  return (
    <Styled.SelectPopupItemList>
      {recommendedProducts.length > 0 &&
        recommendedProducts.map((product) => (
          <Styled.SelectPopupItem
            key={product._id}
            onClick={() => selectProduct(product._id)}
          >
            {product.image && (
              <Image imageId={product.image} roundedDataGrid={true} />
            )}

            <Styled.ItemContent>
              <h2>{product.name}</h2>
              {product.description && <p> {product.description}</p>}
              <Styled.ItemFeaturesWrapper>
                <Styled.ItemFeature>
                  B (g): <b>{product.protein.gram}</b>
                </Styled.ItemFeature>
                <Styled.ItemFeature>
                  T (g): <b>{product.fat.gram}</b>
                </Styled.ItemFeature>
                <Styled.ItemFeature>
                  W (g): <b>{product.carbohydrates.gram}</b>
                </Styled.ItemFeature>
                <Styled.ItemFeature>
                  Wp (g): <b>{product.digestableCarbohydrates.gram}</b>
                </Styled.ItemFeature>
                <Styled.ItemFeature>
                  Bł (g): <b>{product.fiber.gram}</b>
                </Styled.ItemFeature>
                <Styled.ItemFeature>
                  Kcal: <b>{product.kcal}</b>
                </Styled.ItemFeature>
              </Styled.ItemFeaturesWrapper>
            </Styled.ItemContent>
          </Styled.SelectPopupItem>
        ))}
    </Styled.SelectPopupItemList>
  );
};

export default RecommendedProducts;
