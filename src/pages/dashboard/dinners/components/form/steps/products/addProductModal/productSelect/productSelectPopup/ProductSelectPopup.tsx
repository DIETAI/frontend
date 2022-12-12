import React, { useState, useRef, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useParams } from "react-router";

//components
import Image from "components/form/images/image/Image";
import AllProducts from "./allProducts/AllProducts";
import RecommendedProducts from "./recommendProductsV2/RecommendedProducts";

//styles
import * as Styled from "./ProductSelectPopup.styles";

import { getProducts } from "services/getProducts";
import { getDinnerProducts } from "services/getDinnerProducts";

type IFilterOption = "recommend" | "all" | "group";

interface ISelectProductPopupProps {
  closePopup: () => void;
  openPopup: boolean;
  searchValue: string;
}

const ProductSelectPopup = ({
  closePopup,
  openPopup,
  searchValue,
}: ISelectProductPopupProps) => {
  const { dinnerId } = useParams();

  if (!dinnerId) return null;

  const [filterOption, setFilterOption] = useState<IFilterOption>("recommend");
  const { products, productsError, productsLoading } = getProducts();
  const { dinnerProducts, dinnerProductsLoading, dinnerProductsError } =
    getDinnerProducts(dinnerId);

  const {
    control,
    formState: { errors, isValid, isSubmitting },
    setValue,
    watch,
    getValues,
  } = useFormContext();

  const autocompleteRef = useRef<HTMLDivElement>(null);
  const productId = watch("productId") as string;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!autocompleteRef.current?.contains(e.target as Node)) {
        closePopup();
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  useEffect(() => {
    if (productId) {
      closePopup();
    }
  }, [productId]);

  const selectProduct = (productId: string) => {
    setValue("productId", productId);
    //closePopup
    closePopup();
  };

  if (!openPopup) return null;

  if (productsLoading || dinnerProductsLoading)
    return <div>products loading</div>;
  if (productsError || dinnerProductsError) return <div>products error</div>;

  return (
    <Styled.SelectPopupWrapper ref={autocompleteRef}>
      <Styled.SelectPopupNav>
        {dinnerProducts && dinnerProducts.length > 0 && (
          <Styled.SelectPopupNavItem
            activeOption={filterOption === "recommend"}
            onClick={() => setFilterOption("recommend")}
          >
            rekomendowane
          </Styled.SelectPopupNavItem>
        )}

        <Styled.SelectPopupNavItem
          activeOption={filterOption === "all"}
          onClick={() => setFilterOption("all")}
        >
          wszystkie
        </Styled.SelectPopupNavItem>
        {/* <Styled.SelectPopupNavItem>grupy</Styled.SelectPopupNavItem> */}
      </Styled.SelectPopupNav>

      {dinnerProducts &&
        dinnerProducts.length > 0 &&
        filterOption === "recommend" && (
          <RecommendedProducts selectProduct={selectProduct} />
        )}

      {/* {filterOption === "recommend" && (
        <RecommendedProducts selectProduct={selectProduct} />
      )} */}
      {filterOption === "all" && (
        <AllProducts selectProduct={selectProduct} searchValue={searchValue} />
      )}
    </Styled.SelectPopupWrapper>
  );
};

export default ProductSelectPopup;
