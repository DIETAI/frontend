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
        image={product.image}
        gallery={product.gallery}
      />
      <ProductStep.Macrohydrates
        protein={product.protein}
        fat={product.fat}
        carbohydrates={product.carbohydrates}
        fiber={product.fiber}
      />
    </Styled.ProductContentWrapper>
  );
};

export default ProductContent;
