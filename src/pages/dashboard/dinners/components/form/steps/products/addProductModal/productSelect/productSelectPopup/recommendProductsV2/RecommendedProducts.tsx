import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import NoData from "assets/noData.svg";
import { getDinnerProducts } from "services/getDinnerProducts";

//styles
import * as Styled from "../ProductSelectPopup.styles";

//components
import Image from "components/form/images/image/Image";
import { IProductData } from "interfaces/product.interfaces";
import ReactLoading from "react-loading";

//queries
import { getDinnerProductsQuery } from "services/getDinnerProducts";
import { getProduct } from "services/getProducts";
import { AnimatePresence } from "framer-motion";
import { getRecommendProducts } from "services/recommend/getRecommendProducts";

interface IRecommendedProductsProps {
  selectProduct: (productId: string) => void;
  //   searchValue: string;
}

const RecommendedProducts = ({ selectProduct }: IRecommendedProductsProps) => {
  const { dinnerId } = useParams();

  if (!dinnerId) return null;
  const {
    recommendProducts,
    recommendProductsError,
    recommendProductsLoading,
  } = getRecommendProducts(dinnerId);

  return (
    <Styled.SelectPopupItemList>
      {/* {JSON.stringify(recommendProducts.data)} */}

      <AnimatePresence>
        {recommendProductsLoading && (
          <Styled.LoadingWrapper
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ReactLoading type="spin" color="blue" height={50} width={50} />
            <h2>szukanie produktów</h2>
          </Styled.LoadingWrapper>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {recommendProducts &&
          recommendProducts.length > 0 &&
          recommendProducts.map((recommendProduct) => (
            <RecommendProduct
              key={recommendProduct.recommendProductId}
              productId={recommendProduct.recommendProductId}
              selectProduct={selectProduct}
            />
          ))}
      </AnimatePresence>

      <AnimatePresence>
        {!recommendProducts ||
          (recommendProducts.length < 1 && (
            <Styled.EmptyDataWrapper
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <img src={NoData} />
              <h2>brak rekomendowanych produktów</h2>
            </Styled.EmptyDataWrapper>
          ))}
      </AnimatePresence>
    </Styled.SelectPopupItemList>
  );
};

const RecommendProduct = ({
  productId,
  selectProduct,
}: {
  productId: string;
  selectProduct: (productId: string) => void;
}) => {
  const { product, productLoading, productError } = getProduct(productId);

  if (!product) return null;

  return (
    <Styled.SelectPopupItem
      onClick={() => selectProduct(product._id)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
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
  );
};

export default RecommendedProducts;
