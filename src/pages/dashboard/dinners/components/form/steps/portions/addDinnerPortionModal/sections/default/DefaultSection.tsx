import React from "react";
import Product from "../../product/Product";
import { getDinnerProducts } from "services/getDinnerProducts";
import { useParams } from "react-router";

const DefaultSection = () => {
  const { dinnerId } = useParams();
  const { dinnerProducts, dinnerProductsLoading, dinnerProductsError } =
    getDinnerProducts(dinnerId as string);

  if (dinnerProductsLoading) return <div>loading...</div>;
  if (dinnerProductsError) return <div>error...</div>;
  if (!dinnerProducts || dinnerProducts.length < 1)
    return <p>brak produktów</p>;
  return (
    <>
      {dinnerProducts.map((dinnerProduct) => (
        <Product
          key={dinnerProduct.productId}
          productId={dinnerProduct.productId}
          defaultAmount={dinnerProduct.defaultAmount}
        />
      ))}
    </>
  );
};

export default DefaultSection;
