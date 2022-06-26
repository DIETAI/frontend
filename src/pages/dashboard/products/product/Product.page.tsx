import React from "react";
import { useParams } from "react-router";
import { getProduct } from "services/getProducts";

const Product = () => {
  const { productId } = useParams();
  console.log({ productId });

  if (!productId) return <div>not found</div>;

  const { product, productError, productLoading } = getProduct(productId);

  if (productLoading) return <div>product loading...</div>;
  if (productError || !product) return <div>product error</div>;

  console.log({ product });
  return <div>Produkt: {product.name}</div>;
};

export default Product;
