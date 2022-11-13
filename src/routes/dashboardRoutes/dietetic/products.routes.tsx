import React, { useEffect, useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import NotFound from "pages/information/notFound/notFound.page";

import {
  Product,
  AllProducts,
  NewProduct,
  EditProduct,
} from "pages/dashboard/products";

//components
import PageNav from "components/pageNav/PageNav";

interface INavLink {
  id: number;
  title: string;
  path: string;
}

const productNavLinks: INavLink[] = [
  { id: 1, title: "wszystkie produkty", path: "/dashboard/products" },
  { id: 2, title: "nowy produkt", path: "/dashboard/products/new" },
  // { id: 2, title: "twoje produkty", path: "/dashboard/products/my" },
  // { id: 2, title: "grupy produktów", path: "/dashboard/products/groups" },
];

const ProductRoutes = () => {
  // useEffect(() => {
  //   console.log("strona produktu");
  //   console.log({ productIds: param[0] });
  //   if (param) {
  //     setNavLink([
  //       ...navLinks,
  //       {
  //         id: productNavLinks.length + 1,
  //         title: "produkt",
  //         path: `/dashboard/products/${param[0]}`,
  //       },
  //     ]);
  //   }
  // }, [param]);

  //useSwr check userRole
  return (
    <>
      {/* <PageNav headingTitle={"Produkty"} pageNavLinks={navLinks} /> */}
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
