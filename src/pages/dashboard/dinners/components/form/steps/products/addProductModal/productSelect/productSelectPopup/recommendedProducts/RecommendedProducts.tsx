import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import NoData from "assets/noData.svg";

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

interface IRecommendProductData {
  distance: number;
  recommend_product: string;
  recommend_product_id: string;
  recommend_product_max_amount: number;
  recommend_product_min_amount: number;
}

interface IRecommendProductsState {
  data: IRecommendProductData[];
  error: boolean;
  loading: boolean;
}

interface IRecommendedProductsProps {
  selectProduct: (productId: string) => void;
  //   searchValue: string;
}

const RecommendedProducts = ({ selectProduct }: IRecommendedProductsProps) => {
  const [recommendProducts, setRecommendProducts] =
    useState<IRecommendProductsState>({
      data: [],
      loading: false,
      error: false,
    });

  const { dinnerId } = useParams();

  if (!dinnerId) return null;

  const {
    dinnerProductsQuery,
    dinnerProductsLoadingQuery,
    dinnerProductsErrorQuery,
  } = getDinnerProductsQuery(dinnerId);

  useEffect(() => {
    if (dinnerProductsQuery && dinnerProductsQuery.length > 0) {
      const getRecommendProducts = async () => {
        const allDinnerProducts = dinnerProductsQuery.map((dinnerProduct) => ({
          _id: dinnerProduct._id,
          productId: dinnerProduct.product._id,
          productName: dinnerProduct.product.name,
          dinnerId: dinnerId,
          user: dinnerProduct.user,
        }));

        console.log({ allDinnerProducts });

        try {
          setRecommendProducts({ ...recommendProducts, loading: true });

          const recommendProductsRes = await axios.post<
            IRecommendProductData[]
          >(
            "https://diet-ai-recommend-server.herokuapp.com/mvp-recommend-products",
            allDinnerProducts
          );

          setRecommendProducts({
            ...recommendProducts,
            data: recommendProductsRes.data,
            loading: false,
          });
        } catch (e) {
          console.log(e);
          setRecommendProducts({
            ...recommendProducts,
            loading: false,
            error: true,
          });
        }
      };

      getRecommendProducts();
    }
  }, [dinnerProductsQuery]);

  //   useEffect(() => {
  //     const recommendedProducts = getRecommendedProducts();
  //   }, []);

  return (
    <Styled.SelectPopupItemList>
      {/* {JSON.stringify(recommendProducts.data)} */}

      <AnimatePresence>
        {recommendProducts.loading && (
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
        {recommendProducts.data.length > 0 &&
          recommendProducts.data.map((recommendProduct) => (
            <RecommendProduct
              key={recommendProduct.recommend_product_id}
              productId={recommendProduct.recommend_product_id}
              selectProduct={selectProduct}
            />
          ))}
      </AnimatePresence>

      <AnimatePresence>
        {recommendProducts.data.length < 1 && !recommendProducts.loading && (
          <Styled.EmptyDataWrapper
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <img src={NoData} />
            <h2>brak rekomendowanych produktów</h2>
          </Styled.EmptyDataWrapper>
        )}
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
