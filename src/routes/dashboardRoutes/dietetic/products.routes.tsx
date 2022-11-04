import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "pages/information/notFound/notFound.page";

import {
  Product,
  AllProducts,
  NewProduct,
  EditProduct,
} from "pages/dashboard/products";

//components
import PageNav from "components/pageNav/PageNav";

const productNavLinks = [
  { id: 1, title: "wszystkie produkty", path: "/dashboard/products" },
  // { id: 2, title: "twoje produkty", path: "/dashboard/products/my" },
  // { id: 2, title: "grupy produktów", path: "/dashboard/products/groups" },
  { id: 3, title: "nowy produkt", path: "/dashboard/products/new" },
];

const ProductRoutes = () => {
  //useSwr check userRole
  return (
    <>
      <PageNav headingTitle={"Produkty"} pageNavLinks={productNavLinks} />
      <Routes>
        <Route path="/" element={<AllProducts />} />
        <Route path="/new" element={<NewProduct />} />
        <Route path="/edit/:productId" element={<EditProduct />} />
        <Route path="/:productId" element={<Product />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default ProductRoutes;
