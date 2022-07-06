import React, { useState, useRef, useEffect } from "react";
import { useFormContext } from "react-hook-form";

//components
import Image from "components/form/images/image/Image";

//styles
import * as Styled from "./ProductSelectPopup.styles";

import { getProducts } from "services/getProducts";

type IFilterOption = "recommend" | "all" | "group";

interface ISelectProductPopupProps {
  closePopup: () => void;
  openPopup: boolean;
}

const ProductSelectPopup = ({
  closePopup,
  openPopup,
}: ISelectProductPopupProps) => {
  const { products, productsError, productsLoading } = getProducts();

  const [filterOption, setFilterOption] = useState("recommend");
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
        <Styled.SelectPopupNavItem>rekomendowane</Styled.SelectPopupNavItem>
        <Styled.SelectPopupNavItem>wszystkie</Styled.SelectPopupNavItem>
        <Styled.SelectPopupNavItem>grupy</Styled.SelectPopupNavItem>
      </Styled.SelectPopupNav>
      <Styled.SelectPopupItemList>
        {products &&
          products.map((product) => (
            <Styled.SelectPopupItem
              key={product._id}
              onClick={() => selectProduct(product._id)}
            >
              {product.image && (
                <Image imageId={product.image} roundedSelect={true} />
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
    </Styled.SelectPopupWrapper>
  );
};

export default ProductSelectPopup;
