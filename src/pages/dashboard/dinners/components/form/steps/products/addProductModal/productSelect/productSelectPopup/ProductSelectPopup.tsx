import React, { useState, useRef, useEffect } from "react";
import { useFormContext } from "react-hook-form";

//components
import Image from "components/form/images/image/Image";
import AllProducts from "./allProducts/AllProducts";
import RecommendedProducts from "./recommendedProducts/RecommendedProducts";

//styles
import * as Styled from "./ProductSelectPopup.styles";

import { getProducts } from "services/getProducts";

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
  const [filterOption, setFilterOption] = useState<IFilterOption>("recommend");
  const { products, productsError, productsLoading } = getProducts();

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

  if (productsLoading) return <div>products loading</div>;
  if (productsError) return <div>products error</div>;

  return (
    <Styled.SelectPopupWrapper ref={autocompleteRef}>
      <Styled.SelectPopupNav>
        <Styled.SelectPopupNavItem
          activeOption={filterOption === "recommend"}
          onClick={() => setFilterOption("recommend")}
        >
          rekomendowane
        </Styled.SelectPopupNavItem>
        <Styled.SelectPopupNavItem
          activeOption={filterOption === "all"}
          onClick={() => setFilterOption("all")}
        >
          wszystkie
        </Styled.SelectPopupNavItem>
        {/* <Styled.SelectPopupNavItem>grupy</Styled.SelectPopupNavItem> */}
      </Styled.SelectPopupNav>
      {filterOption === "recommend" && (
        <RecommendedProducts selectProduct={selectProduct} />
      )}
      {filterOption === "all" && (
        <AllProducts selectProduct={selectProduct} searchValue={searchValue} />
      )}
    </Styled.SelectPopupWrapper>
  );
};

export default ProductSelectPopup;
